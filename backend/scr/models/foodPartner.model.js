import { request } from "express";
import mongoose from "mongoose";

const foodPartnerSchema = mongoose.Schema({
  ownerName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  businessName:{
    type:String,
    required:true,
  },
  contact:{
    type:Number,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  address:{
    type:String,

  },
  connections:{
    type:Number,
    default:0
  }
},{
  timestamps:true
})

export const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);

export default FoodPartner;
