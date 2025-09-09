import { CreateEventOrganizerDto, UpdateEventOrganizerDto } from '../../dtos/event-organizer.dto';
import { FilterEventOrganizerParams } from '../../params/eventOrganizer.params';
import { Event, EventOrganizer, ImageOrganizer } from '../../prisma/generated';

export type EventOrganizerWithDetails = EventOrganizer & {
  events: Event[];
  image: ImageOrganizer[];
};

export interface IEventOrganizerRepository {
  findAll(
    filters?: FilterEventOrganizerParams,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string
  ): Promise<EventOrganizerWithDetails[]>;
  findById(id: string): Promise<EventOrganizerWithDetails | null>;
  create(data: CreateEventOrganizerDto): Promise<EventOrganizer>;
  update(id: string, data: UpdateEventOrganizerDto): Promise<EventOrganizer | null>;
  delete(id: string): Promise<EventOrganizer | null>;
  createImage({ url, organizerId, deleteId }: { url: string; organizerId: string; deleteId: string }): Promise<ImageOrganizer | null>;
}
