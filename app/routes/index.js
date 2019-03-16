import { Router } from 'express';
import phoneRoutes from './phoneRoutes';

const router = Router();

router.use('/phonenumbers', phoneRoutes);

export default router;