import { Request, Response } from 'express';
import { TYPES } from '../config/ioc.types';
import { CreateEventOrganizerDto, EventOrganizerDto, UpdateEventOrganizerDto } from '../dtos/event-organizer.dto';
import container from '../config/ioc.config';
import IUnitOfService from '../services/interfaces/iunitof.service';
import CustomResponse from '../dtos/custom-response';
import CustomError from '../exceptions/custom-error';

export class EventOrganizerController {
  constructor(private readonly unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {
    this.unitOfService = unitOfService;
  }

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<EventOrganizerDto>>> => {
    const { jwtToken, currentUserId, currentUserName, currentUserRole, ...rest } = req.body;
    const files = req.files as Express.Multer.File[];

    const createDto: CreateEventOrganizerDto = {
      ...rest,
      images: files,
    };

    const eventOrganizer = await this.unitOfService.EventOrganizer.create(createDto);
    const response: CustomResponse<EventOrganizerDto> = {
      success: true,
      data: eventOrganizer,
    };
    return res.status(201).json(response);
  };

  // --- Other controller methods would be implemented here ---
  findAllEventOrganizer = async (req: Request, res: Response): Promise<Response<CustomResponse<EventOrganizerDto[]>>> => {
    const organizers = await this.unitOfService.EventOrganizer.findAll();
    const response: CustomResponse<EventOrganizerDto[]> = {
      success: true,
      data: organizers,
    };
    return res.status(200).json(response);
  };

  findById = async (req: Request, res: Response): Promise<Response<CustomResponse<EventOrganizerDto | null>>> => {
    const organizer = await this.unitOfService.EventOrganizer.findById(req.params.id);

    if (!organizer) {
      throw new CustomError('Event Organizer not found', 404);
    }

    const response: CustomResponse<EventOrganizerDto | null> = {
      success: true,
      data: organizer,
    };
    return res.status(200).json(response);
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<EventOrganizerDto>>> => {
    const { jwtToken, currentUserId, currentUserName, currentUserRole, ...organizerData } = req.body;
    const organizerId = req.params.id;
    const files = req.files as Express.Multer.File[];

    const data: UpdateEventOrganizerDto = {
      ...organizerData,
      images: files,
    };

    const organizer = await this.unitOfService.EventOrganizer.update(organizerId, data);

    if (!organizer) {
      throw new CustomError('Event Organizer not found', 404);
    }

    const response: CustomResponse<EventOrganizerDto> = {
      success: true,
      data: organizer,
    };

    return res.status(200).json(response);
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<EventOrganizerDto>>> => {
    const organizerId = req.params.id;
    const organizer = await this.unitOfService.EventOrganizer.delete(organizerId);

    if (!organizer) {
      throw new CustomError('Event Organizer not found', 404);
    }

    const response: CustomResponse<EventOrganizerDto> = {
      success: true,
      data: organizer,
    };

    return res.status(200).json(response);
  };
}
