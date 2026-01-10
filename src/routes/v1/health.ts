import express from 'express';
import { healthCheck } from '../../controllers/v1/health';

const router = express.Router();

router.get('/', healthCheck);

export default router;
