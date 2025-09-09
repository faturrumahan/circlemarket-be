import { CreateEventOrganizerDto, UpdateEventOrganizerDto } from '../dtos/event-organizer.dto';
import prisma from '../prisma';
import { EventOrganizer } from '../prisma/generated';
import { EventOrganizerWithDetails, IEventOrganizerRepository } from './interfaces/iEventOrganizer.repository';

export class EventOrganizerRepository implements IEventOrganizerRepository {
  async findAll(): Promise<EventOrganizerWithDetails[]> {
    return prisma.eventOrganizer.findMany({
      include: {
        events: true,
        image: true,
      },
    });
  }

  async findById(id: string): Promise<EventOrganizerWithDetails | null> {
    return prisma.eventOrganizer.findUnique({
      where: { id },
      include: {
        events: true,
        image: true,
      },
    });
  }

  async create(data: CreateEventOrganizerDto): Promise<EventOrganizer> {
    const { images, ...organizerData }: any = data;
    return prisma.eventOrganizer.create({
      data: {
        ...organizerData,
        ...(images && {
          images: {
            create: images,
          },
        }),
      },
    });
  }

  async update(id: string, data: UpdateEventOrganizerDto): Promise<EventOrganizer | null> {
    const { images, ...organizerData }: any = data;
    return prisma.eventOrganizer.update({
      where: { id },
      data: {
        ...organizerData,
        ...(images && {
          images: {
            deleteMany: {},
            create: images,
          },
        }),
      },
    });
  }

  async delete(id: string): Promise<EventOrganizer | null> {
    return prisma.eventOrganizer.delete({
      where: { id },
    });
  }

  async createImage({ url, organizerId, deleteId }: { url: string; organizerId: string; deleteId: string }): Promise<any> {
    return prisma.imageOrganizer.create({
      data: {
        url,
        organizerId,
        altText: url,
        deleteId: deleteId,
      },
    });
  }
}
