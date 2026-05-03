import { Request, Response } from "express";
import Project from "../Models/ProjectModel";

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json({ success: true, data: savedProject });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            res.status(404).json({ success: false, message: "Project not found" });
            return;
        }
        res.status(200).json({ success: true, data: project });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            res.status(404).json({ success: false, message: "Project not found" });
            return;
        }
        res.status(200).json({ success: true, data: project });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({ success: false, message: "Project not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};