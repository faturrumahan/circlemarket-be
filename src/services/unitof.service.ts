import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { IEventOrganizerService } from './interfaces/iEventOrganizer.service';
import { IProjectService } from './interfaces/iproject.service';
import IUnitOfService from './interfaces/iunitof.service';
import { IUserService } from './interfaces/iuser.service';

export default class UnitOfService implements IUnitOfService {
  public User: IUserService;
  public Project: IProjectService;
  public EventOrganizer: IEventOrganizerService;

  constructor(user = container.get<IUserService>(TYPES.IUserService), project = container.get<IProjectService>(TYPES.IProjectService), eventOrganizer = container.get<IEventOrganizerService>(TYPES.IEventOrganizerService)) {
    this.User = user;
    this.Project = project;
    this.EventOrganizer = eventOrganizer
  }
}
