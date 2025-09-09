export interface EventDto {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: boolean;
  location: string;
  eventOrganizerId: string;
  image: string[];
}

export interface CreateEventDto extends Omit<EventDto, 'id'> {}

export interface UpdateEventDto extends Partial<CreateEventDto> {}