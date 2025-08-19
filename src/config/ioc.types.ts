export const TYPES = {
  HealthController: Symbol.for('HealthController'),
  UserController: Symbol.for('UserController'),
  AccountController: Symbol.for('AccountController'),
  ProjectController: Symbol.for('ProjectController'),

  IUnitOfService: Symbol.for('IUnitOfService'),
  IUserService: Symbol.for('IUserService'),
  IProjectService: Symbol.for('IProjectService'),

  IUnitOfWork: Symbol.for('IUnitOfWork'),
  IUserRepository: Symbol.for('IUserRepository'),
  IProjectRepository: Symbol.for('IProjectRepository'),
};
