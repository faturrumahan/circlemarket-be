import express from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';
import accountRouter from './account.routes';
import projectRouter from './project.routes';
import eventOrganizerRouter from './eventOrganizer.routes';

const routes = express.Router();

routes.use('/health', healthRouter);
routes.use('/users', userRouter);
routes.use('/auth', accountRouter);
routes.use('/projects', projectRouter)
routes.use('/event-organizer', eventOrganizerRouter)

export default routes;
