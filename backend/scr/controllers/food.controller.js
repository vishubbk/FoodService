import foodModel from "../models/food.model.js";
import imagekit from "../services/storage.service.js"; // <-- ADD THIS

export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Food video or image is required" });
    }

    // 1️⃣ Upload to ImageKit
    const fileBuffer = req.file.buffer;
    const base64Data = fileBuffer.toString("base64");

    const uploadResponse = await imagekit.upload({
      file: base64Data,
      fileName: req.file.originalname,
      folder: "/food-items",
    });


    // 2️⃣ Make sure foodPartnerId mile (token/middleware se)
    const foodPartnerId = req.user?._id || req.foodPartner?._id || req.body.foodPartnerId;

    if (!foodPartnerId) {
      return res.status(400).json({ message: "Food partner ID is missing" });
    }

    // 3️⃣ Ab required fields bharo
    const newFood = new foodModel({
      name,
      description,
      price,
      category,
      video: uploadResponse.url,      // ✅ required
      foodPartner: foodPartnerId,     // ✅ required
    });

    await newFood.save();

    return res.status(201).json({
      message: "Food item added successfully",
      food: newFood,
    });
  } catch (error) {
    console.error("❌ Error adding food item:", error);
    return res.status(500).json({
      message: "Something went wrong while adding food",
      error: error.message,
    });
  }
};

export const getFood = async (req,res) => {
const foods = await foodModel.find()
console.log(foods)
res.status(201).json({foods})

}
