import express from "express";
import jwt from "jsonwebtoken"

function authMiddleware(req,res,next){
  const token = req.cookies.token;
  console.log(token);

  if(!token){
    return res.status(401).json({message:"User Unauthorized"});
  }

  try{
    const decoded =jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next()
  }
  catch(error){
    console.error(error.message);
    res.status(401).json({message:"User Unauthorized"});
  }
}

export default authMiddleware;
