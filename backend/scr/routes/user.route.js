import express from 'express';
import { registerUser,loginUser,logOutUser,getAllItemsUser} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllItems',getAllItemsUser)
router.get('/logout', logOutUser);
export default router;
