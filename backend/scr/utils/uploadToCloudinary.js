import cloudinary from "../services/storage.service.js";

const uploadToCloudinary = (buffer, folder = "food-items") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto", // image / video dono allow
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(buffer);
  });
};

export default uploadToCloudinary;
