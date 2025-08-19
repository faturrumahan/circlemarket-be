import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { IProjectService } from './interfaces/iproject.service';
import IUnitOfService from './interfaces/iunitof.service';
import { IUserService } from './interfaces/iuser.service';

export default class UnitOfService implements IUnitOfService {
  public User: IUserService;
  public Project: IProjectService;

  constructor(user = container.get<IUserService>(TYPES.IUserService), project = container.get<IProjectService>(TYPES.IProjectService)) {
    this.User = user;
    this.Project = project;
  }
}
