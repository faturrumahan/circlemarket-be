export const TYPES = {
  HealthController: Symbol.for('HealthController'),
  UserController: Symbol.for('UserController'),
  AccountController: Symbol.for('AccountController'),
  ProjectController: Symbol.for('ProjectController'),
  EventOrganizerController: Symbol.for('EventOrganizerController'),

  IUnitOfService: Symbol.for('IUnitOfService'),
  IUserService: Symbol.for('IUserService'),
  IProjectService: Symbol.for('IProjectService'),
  IEventOrganizerService: Symbol.for('IEventOrganizerService'),

  IUnitOfWork: Symbol.for('IUnitOfWork'),
  IUserRepository: Symbol.for('IUserRepository'),
  IProjectRepository: Symbol.for('IProjectRepository'),
  IEventOrganizerRepository: Symbol.for('IEventOrganizerRepository'),
};
