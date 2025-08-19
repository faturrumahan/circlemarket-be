import { CreateProjectDto, UpdateProjectDto } from '../../dtos/project.dto';
import { ProjectFilterParams } from '../../params/project.params';
import { Project } from '../../prisma/generated';

export interface IProjectRepository {
  findAll(filters?: ProjectFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  create(data: CreateProjectDto): Promise<Project>;
  update(id: string, data: UpdateProjectDto): Promise<Project | null>;
  delete(id: string): Promise<Project | null>;
}
