export interface ProjectDto {
  id: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  status?: boolean;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}