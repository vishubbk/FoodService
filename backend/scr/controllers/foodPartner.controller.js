import foodPartnerModel from "../models/foodPartner.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerFoodPartner = async (req, res) => {
  try {
    const { ownerName, email, password,businessName,contact,address } = req.body;

    const alreadyExistFoodPartner = await foodPartnerModel.findOne({ email });

    if (alreadyExistFoodPartner) {
      return res.status(400).json({message:"Email Already Registered"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFoodPartner = await foodPartnerModel.create({
      ownerName,
      email,
      password: hashedPassword,
      businessName,
      contact,
      address
    });

    const token = jwt.sign(
      { userId: newFoodPartner._id, email: newFoodPartner.email },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "Food Partner Registered Successfully",
      token,
      user: {
        id: newFoodPartner._id,
        fullName: newFoodPartner.fullName,
        email: newFoodPartner.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
      return res.status(400).json({
        message: "Email or password is invalid",
      });

    }

    // 2️⃣ Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foodPartner.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Email or password is invalid",
      });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { foodPartnerId: foodPartner._id, email: foodPartner.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 5️⃣ Send response
    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: foodPartner._id,
        userName: foodPartner.fullName,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Something went wrong while logging in",
      error: error.message,
    });
  }
};

export const logOutFoodPartner = async (req, res) =>{
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout Successful"
    })
  } catch (error) {

  }
}
