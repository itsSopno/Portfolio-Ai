import { Router } from 'express';
import { 
    createProject, 
    getProjects, 
    getProjectById, 
    updateProject, 
    deleteProject 
} from '../controller/ProjectController';

const router = Router();

// Test API route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is healthy' });
});

// Project Routes
router.post('/projects', createProject);
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
