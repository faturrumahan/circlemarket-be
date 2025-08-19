import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import prisma from '../prisma';
import { Project } from '../prisma/generated';
import { IProjectRepository } from './interfaces/iproject.repository';

export class ProjectRepository implements IProjectRepository {
  async findAll(): Promise<Project[]> {
    return prisma.project.findMany();
  }

  async findById(id: string): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProjectDto): Promise<Project> {
    return prisma.project.create({
      data,
    });
  }

  async update(id: string, data: UpdateProjectDto): Promise<Project | null> {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Project | null> {
    return prisma.project.delete({
      where: { id },
    });
  }
}
