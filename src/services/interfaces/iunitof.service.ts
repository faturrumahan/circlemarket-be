import { IEventOrganizerService } from './iEventOrganizer.service';
import { IProjectService } from './iproject.service';
import { IUserService } from './iuser.service';

export default interface IUnitOfService {
  User: IUserService;
  Project: IProjectService;
  EventOrganizer: IEventOrganizerService;
}
