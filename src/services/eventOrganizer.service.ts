import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { IEventOrganizerService } from './interfaces/iEventOrganizer.service';
import { CreateEventOrganizerDto, EventOrganizerDto, UpdateEventOrganizerDto } from '../dtos/event-organizer.dto';
import { EventOrganizerWithDetails } from '../repositories/interfaces/iEventOrganizer.repository';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

@injectable()
export class EventOrganizerService implements IEventOrganizerService {
  constructor(@inject(TYPES.IUnitOfWork) private readonly unitOfWork: IUnitOfWork) {}

  async findAll(): Promise<EventOrganizerDto[]> {
    const eventOrganizers = await this.unitOfWork.EventOrganizer.findAll();
    if (!eventOrganizers) {
      return [];
    }
    return eventOrganizers.map(this.convertToDto);
  }

  async findById(id: string): Promise<EventOrganizerDto | null> {
    const eventOrganizer = await this.unitOfWork.EventOrganizer.findById(id);
    if (!eventOrganizer) {
      return null;
    }
    return this.convertToDto(eventOrganizer);
  }

  async create(data: CreateEventOrganizerDto): Promise<EventOrganizerDto> {
    // 1. Separate file data from the rest of the DTO.
    console.log('data:', data);
    const { images, ...organizerData } = data;

    // 2. Create the core EventOrganizer entity first to get its unique ID.
    const eventOrganizer = await this.unitOfWork.EventOrganizer.create(organizerData);

    // 3. If images were provided, upload them to Vercel Blob and link them.
    if (images && images.length > 0) {
      const imageCreationPromises = images.map(async (imageFile) => {
        // Generate a unique path/filename to prevent overwrites.
        // const blobPath = `event-organizers/${eventOrganizer.id}/${uuidv4()}-${imageFile.originalname}`;

        // // Upload the file buffer to Vercel Blob. `access: 'public'` makes it viewable.
        // const blob = await put(blobPath, imageFile.buffer, {
        //   access: 'public',
        //   contentType: imageFile.mimetype,
        // });

        const imgurResponse = await axios.post(
          'https://api.imgur.com/3/image',
          {
            image: imageFile.buffer.toString('base64'),
            type: 'base64',
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.IMGUR_TOKEN}`,
            },
          }
        );

        // Create a record in your `ImageOrganizer` table with the returned URL.
        await this.unitOfWork.EventOrganizer.createImage({
          url: imgurResponse.data.data.link,
          organizerId: eventOrganizer.id,
          deleteId: imgurResponse.data.data.deletehash,
        });
      });

      // Wait for all uploads and database inserts to complete.
      await Promise.all(imageCreationPromises);
    }

    // 4. Re-fetch the organizer with all its relations (including the new images).
    const newOrganizerWithDetails = await this.unitOfWork.EventOrganizer.findById(eventOrganizer.id);
    if (!newOrganizerWithDetails) {
      throw new Error('Failed to retrieve event organizer details after creation.');
    }

    // 5. Convert the full entity to a DTO and return it.
    return this.convertToDto(newOrganizerWithDetails);
  }

  async update(id: string, data: UpdateEventOrganizerDto): Promise<EventOrganizerDto | null> {
    const eventOrganizer = await this.unitOfWork.EventOrganizer.update(id, data);
    if (!eventOrganizer) {
      return null;
    }

    const newOrganizerWithDetails = await this.unitOfWork.EventOrganizer.findById(eventOrganizer.id);
    if (!newOrganizerWithDetails) {
      throw new Error('Failed to retrieve event organizer details after creation.');
    }
    return this.convertToDto(newOrganizerWithDetails);
  }

  async delete(id: string): Promise<EventOrganizerDto | null> {
    const eventOrganizer = await this.unitOfWork.EventOrganizer.delete(id);
    if (!eventOrganizer) {
      return null;
    }

    const newOrganizerWithDetails = await this.unitOfWork.EventOrganizer.findById(eventOrganizer.id);
    if (!newOrganizerWithDetails) {
      throw new Error('Failed to retrieve event organizer details after creation.');
    }
    return this.convertToDto(newOrganizerWithDetails);
  }

  convertToDto(eventOrganizer: EventOrganizerWithDetails): EventOrganizerDto {
    return {
      id: eventOrganizer.id,
      name: eventOrganizer.name,
      email: eventOrganizer.email,
      phone: eventOrganizer.phone,
      location: eventOrganizer.location,
      events: eventOrganizer.events.map((event) => event.id),
      image: eventOrganizer.image.map((img) => img.url),
      description: eventOrganizer.description,
      createdAt: eventOrganizer.createdAt,
      updatedAt: eventOrganizer.updatedAt,
    };
  }
}

export default EventOrganizerService;
