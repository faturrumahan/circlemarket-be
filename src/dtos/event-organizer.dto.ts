export interface EventOrganizerDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  events?: string[];
  image?: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventOrganizerDto extends Omit<EventOrganizerDto, 'id' | 'createdAt' | 'updatedAt'> {
  images?: Express.Multer.File[];
}

export interface UpdateEventOrganizerDto extends Partial<EventOrganizerDto> {
  images?: Express.Multer.File[];
  deletedImages?: string[];
}
