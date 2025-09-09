import { CreateEventOrganizerDto, EventOrganizerDto, UpdateEventOrganizerDto } from "../../dtos/event-organizer.dto";
import { EventOrganizer } from '../../prisma/generated';

export interface IEventOrganizerService {
  findAll(): Promise<EventOrganizerDto[]>;
  findById(id: string): Promise<EventOrganizerDto | null>;
  create(data: CreateEventOrganizerDto): Promise<EventOrganizerDto>;
  update(id: string, data: UpdateEventOrganizerDto): Promise<EventOrganizerDto | null>;
  delete(id: string): Promise<EventOrganizerDto | null>;
  convertToDto(eventOrganizer: EventOrganizer): EventOrganizerDto;
}