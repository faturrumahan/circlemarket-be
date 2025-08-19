import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '../../dtos/project.dto';
import { Project } from '../../prisma/generated';

export interface IProjectService {
  findAll(): Promise<ProjectDto[]>;
  findById(id: string): Promise<ProjectDto | null>;
  create(data: CreateProjectDto): Promise<ProjectDto>;
  update(id: string, data: UpdateProjectDto): Promise<ProjectDto | null>;
  delete(id: string): Promise<ProjectDto | null>;
  convertToDto(project: Project): ProjectDto;
}
