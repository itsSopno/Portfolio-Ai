import { Router } from 'express';

const router = Router();

// Test API route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is healthy' });
});

export default router;
