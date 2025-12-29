import foodModel from "../models/food.model.js";
import Cloudinary from "../services/storage.service.js"; // <-- ADD THIS
import uploadToCloudinary from "../utils/uploadToCloudinary.js";


export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Food image or video is required" });
    }

    // ✅ Upload to Cloudinary
    const uploadResponse = await uploadToCloudinary(req.file.buffer);

    // ✅ food partner id
    const foodPartnerId = req.foodPartner?._id || req.body.foodPartnerId;

    if (!foodPartnerId) {
      return res.status(400).json({ message: "Food partner ID is missing" });
    }

    const newFood = await foodModel.create({
      name,
      description,
      price,
      category,
      video: uploadResponse.secure_url, // ✅ Cloudinary URL
      foodPartner: foodPartnerId,
    });

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


