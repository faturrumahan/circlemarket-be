import { Container } from 'inversify';
import { TYPES } from './ioc.types';

import { HealthController } from '../controllers/health.controller';
import { AccountController } from '../controllers/account.controller';
import { UserController } from '../controllers/user.controller';
import { ProjectController } from '../controllers/project.controller';

import IUnitOfService from '../services/interfaces/iunitof.service';
import { IUserService } from '../services/interfaces/iuser.service';
import { IProjectService } from '../services/interfaces/iproject.service';

import UnitOfService from '../services/unitof.service';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';

import { UserRepository } from '../repositories/user.repository';
import { IUserRepository } from '../repositories/interfaces/iuser.repository';
import UnitOfWork from '../repositories/unitofwork.repository';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { ProjectRepository } from '../repositories/project.repository';
import { IProjectRepository } from '../repositories/interfaces/iproject.repository';

const container = new Container();

container.bind<HealthController>(TYPES.HealthController).to(HealthController);
container.bind<AccountController>(TYPES.AccountController).to(AccountController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<ProjectController>(TYPES.ProjectController).to(ProjectController);

container.bind<IUnitOfService>(TYPES.IUnitOfService).to(UnitOfService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);

container.bind<IUnitOfWork>(TYPES.IUnitOfWork).to(UnitOfWork);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

container.bind<IProjectRepository>(TYPES.IProjectRepository).to(ProjectRepository);
container.bind<IProjectService>(TYPES.IProjectService).to(ProjectService);

export default container;
