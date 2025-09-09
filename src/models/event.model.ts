export interface CreateEventModel {
  title: string;
  description: string;
  date: Date;
  status: boolean;
  location: string;
  eventOrganizerId: string;
  image: string[];
}
