import express from 'express';
import { register, login, logout, updateDetails, updatePassword } from '../../controllers/v1/auth';
import { protect } from '../../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

export default router;
