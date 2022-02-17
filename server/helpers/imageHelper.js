import sharp from "sharp";
import config from "../config/index.js";

// multer upload
const resizeSingleImage = async (req, filename = "image") => {
  const file = req.file;
  if (!file) {
    return null;
  }

  try {
    const imageFilename = `${filename}_${Date.now()}.jpeg`;
    const imageUrl = "/assets/listings/" + imageFilename;
    const imageFullUrl = new URL(
      `${req.protocol}://${req.get("host")}${imageUrl}`
    );
    await sharp(file.buffer)
      .resize(1080, 720, {
        kernel: sharp.kernel.nearest,
        fit: "fill",
      })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/${imageUrl}`);
    return {
      url: imageUrl,
      full_url: imageFullUrl,
      filename: imageFilename,
      public_id: `${Date.now()}`,
    };
  } catch (error) {
    return new Error(error.message);
  }
};

// multer upload
const resizeMultipleImages = async (req, filename = "images") => {
  const files = req.files;
  if (!files) {
    return new Error("No files found");
  }

  let imagesPromises = files.map(async (img, i) => {
    const imageFilename = `${filename}_${Date.now()}_${1 + i}.jpeg`;
    const imageUrl = "/assets/listings/" + imageFilename;
    const imageFullUrl = new URL(
      `${req.protocol}://${req.get("host")}${imageUrl}`
    );
    await sharp(img.buffer)
      .resize(1080, 720, {
        kernel: sharp.kernel.nearest,
        fit: "fill",
      })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/${imageUrl}`);
    return {
      url: imageUrl,
      full_url: imageFullUrl,
      filename: imageFilename,
      public_id: `${Date.now()}${1 + i}`,
    };
  });

  const imagesUrls = await Promise.all(imagesPromises);
  return imagesUrls;
};

export default { resizeMultipleImages, resizeSingleImage };
