import express from "express";
const router = express.Router();
import { addFood, getFood } from "../controllers/food.controller.js";
import authenticateFoodPartner from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/addFood",
  authenticateFoodPartner,
  upload.single("video"), //
  addFood
);

router.get("/getFood",authenticateFoodPartner,getFood)
export default router;
