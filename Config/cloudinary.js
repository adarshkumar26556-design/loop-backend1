import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = async (localFilePath) => {
  try {
    const uploaded = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",  
      folder: "InstaSpere",
    });

    fs.unlinkSync(localFilePath); 
    return uploaded.secure_url;

  } catch (error) {
    console.error("Cloudinary upload error:", error);

    
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw error;
  }
};

export default cloudinary;