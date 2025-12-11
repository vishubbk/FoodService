import express from 'express';
import { registerFoodPartner,loginFoodPartner,logOutFoodPartner} from '../controllers/foodPartner.controller.js';

const router = express.Router();

router.post('/register', registerFoodPartner);
router.post('/login', loginFoodPartner);
router.post('/logout', logOutFoodPartner);
export default router;
