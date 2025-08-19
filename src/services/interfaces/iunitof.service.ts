import { IProjectService } from './iproject.service';
import { IUserService } from './iuser.service';

export default interface IUnitOfService {
  User: IUserService;
  Project: IProjectService;
}
