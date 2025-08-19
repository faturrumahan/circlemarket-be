import { inject, injectable } from 'inversify';
import { IProjectService } from './interfaces/iproject.service';
import { TYPES } from '../config/ioc.types';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { Project } from '../prisma/generated';

@injectable()
export class ProjectService implements IProjectService {
  constructor(@inject(TYPES.IUnitOfWork) private readonly unitOfWork: IUnitOfWork) {}

  async findAll(): Promise<ProjectDto[]> {
    const projects = await this.unitOfWork.Project.findAll();
    if (!projects) {
      return [];
    }
    return projects.map(this.convertToDto);
  }

  async findById(id: string): Promise<ProjectDto | null> {
    const project = await this.unitOfWork.Project.findById(id);
    if (!project) {
      return null;
    }
    return this.convertToDto(project);
  }

  async create(data: CreateProjectDto): Promise<ProjectDto> {
    const project = await this.unitOfWork.Project.create(data);
    return this.convertToDto(project);
  }

  async update(id: string, data: UpdateProjectDto): Promise<ProjectDto | null> {
    const project = await this.unitOfWork.Project.update(id, data);
    if (!project) {
      return null;
    }
    return this.convertToDto(project);
  }

  async delete(id: string): Promise<ProjectDto | null> {
    const project = await this.unitOfWork.Project.delete(id);
    if (!project) {
      return null;
    }
    return this.convertToDto(project);
  }

  convertToDto(project: Project): ProjectDto {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}

export default ProjectService;
