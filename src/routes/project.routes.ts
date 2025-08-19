import { Router } from "express";
import container from "../config/ioc.config";
import { ProjectController } from "../controllers/project.controller";
import { TYPES } from "../config/ioc.types";
import authentication from "../middlewares/authentication.middleware";
import asyncHandler from "../middlewares/asyncHandler.middleware";

const projectRouter = Router();

const projectController = container.get<ProjectController>(TYPES.ProjectController);

projectRouter.get('/', [authentication], asyncHandler(projectController.getAllProjects));
projectRouter.get('/:id', [authentication], asyncHandler(projectController.getProjectById));
projectRouter.post('/', [authentication], asyncHandler(projectController.createProject));
projectRouter.put('/:id', [authentication], asyncHandler(projectController.updateProjectById));
projectRouter.delete('/:id', [authentication], asyncHandler(projectController.deleteProjectById));

export default projectRouter;