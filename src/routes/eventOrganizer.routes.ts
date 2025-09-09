import { Router } from 'express';
import { EventOrganizerController } from '../controllers/eventOrganizer.controller';
import { TYPES } from '../config/ioc.types';
import container from '../config/ioc.config';
import authentication from '../middlewares/authentication.middleware';
import asyncHandler from '../middlewares/asyncHandler.middleware';

const eventOrganizerRouter = Router();

const eventOrganizerController = container.get<EventOrganizerController>(TYPES.EventOrganizerController);

eventOrganizerRouter.get('/', [authentication], asyncHandler(eventOrganizerController.findAllEventOrganizer));
eventOrganizerRouter.get('/:id', [authentication], asyncHandler(eventOrganizerController.findById));
eventOrganizerRouter.post('/', [authentication], asyncHandler(eventOrganizerController.create));
eventOrganizerRouter.put('/:id', [authentication], asyncHandler(eventOrganizerController.update));
eventOrganizerRouter.delete('/:id', [authentication], asyncHandler(eventOrganizerController.delete));

export default eventOrganizerRouter;
