// import { v2 as cloudinary } from 'cloudinary'
const fs = require("fs");
const cloud = require("cloudinary");
const cloudinary = cloud.v2;
require("dotenv").config();
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const image = './path/to/image.jpg'; // This can also be a remote URL or a base64 DataURI

// console.log(cloudinary);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const ext = path.extname(localFilePath).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    if (!allowedExtensions.includes(ext)) {
      throw new Error("Only image files are allowed");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    throw error;
  }
};

const uploadPdfOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary

    const ext = path.extname(localFilePath).toLowerCase();
    if (ext !== ".pdf") {
      throw new Error("Only Pdf file allowed");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    throw error;
  }
};

module.exports = { uploadOnCloudinary, uploadPdfOnCloudinary };
