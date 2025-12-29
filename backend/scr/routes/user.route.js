import express from 'express';
import { registerUser,loginUser,logOutUser,getAllItemsUser,getFoodPartnerDetailsUser} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllItems',getAllItemsUser)
router.get('/getFoodPartnerDetails/:id',getFoodPartnerDetailsUser)
router.get('/logout', logOutUser);
export default router;
