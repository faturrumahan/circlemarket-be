import { Request, Response } from 'express';
import container from '../config/ioc.config';
import IUnitOfService from '../services/interfaces/iunitof.service';
import { TYPES } from '../config/ioc.types';
import { ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import CustomResponse from '../dtos/custom-response';
import CustomError from '../exceptions/custom-error';

export class ProjectController {
  constructor(private readonly unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {
    this.unitOfService = unitOfService;
  }

  /**
   * Handles a health check request.
   *
   * Responds with a JSON object indicating the service status.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @returns A response with HTTP status 200 and a JSON body `{ status: 'UP' }`.
   */
  getAllProjects = async (req: Request, res: Response): Promise<Response<CustomResponse<ProjectDto[]>>> => {
    const projects = await this.unitOfService.Project.findAll();
    const response: CustomResponse<ProjectDto[]> = {
      success: true,
      data: projects,
    };
    return res.status(200).json(response);
  };

  getProjectById = async (req: Request, res: Response): Promise<Response<CustomResponse<ProjectDto | null>>> => {
    const project = await this.unitOfService.Project.findById(req.params.id);

    if (!project) {
      throw new CustomError('Project not found', 404);
    }

    const response: CustomResponse<ProjectDto | null> = {
      success: true,
      data: project,
    };
    return res.status(200).json(response);
  };

  createProject = async (req: Request, res: Response): Promise<Response<CustomResponse<ProjectDto>>> => {
    const { jwtToken, currentUserId, currentUserName, currentUserRole, ...projectData } = req.body;

    const project = await this.unitOfService.Project.create(projectData);
    const response: CustomResponse<ProjectDto> = {
      success: true,
      data: project,
    };
    return res.status(201).json(response);
  };

  updateProjectById = async (req: Request, res: Response): Promise<Response<CustomResponse<ProjectDto>>> => {
    const { jwtToken, currentUserId, currentUserName, currentUserRole, ...projectData } = req.body;
    const projectId = req.params.id;
    const data = projectData as UpdateProjectDto;
    const project = await this.unitOfService.Project.update(projectId, data);

    if (!project) {
      throw new CustomError('Project not found', 404);
    }

    const response: CustomResponse<ProjectDto> = {
      success: true,
      data: project,
    };

    return res.status(200).json(response);
  };

  deleteProjectById = async (req: Request, res: Response): Promise<Response<CustomResponse<ProjectDto>>> => {
    const projectId = req.params.id;
    const project = await this.unitOfService.Project.delete(projectId);

    if (!project) {
      throw new CustomError('Project not found', 404);
    }

    const response: CustomResponse<ProjectDto> = {
      success: true,
      data: project,
    };

    return res.status(200).json(response);
  };
}
