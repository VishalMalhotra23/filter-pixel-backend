const imagePaths = require("../data/imagePath");
const exiftool = require("exiftool-vendored").exiftool;
const fs = require("fs/promises");

exports.imagesData = async (req, res) => {
  try {
    const allExifData = [];

    for (const imagePath of imagePaths) {
      const tags = await exiftool.read(imagePath);
      const lensInfo = tags.LensInfo || tags.LensType;

      const exifData = {
        filename: tags.FileName,
        iso: tags.ISO,
        aperture: tags.Aperture,
        captureTime: tags.CreateDate,
        speed: tags.ShutterSpeed,
        imagesize: tags.ImageSize,
        whitebalance: tags.WhiteBalance,
        rating: tags.Rating,
        camera: tags.Model,
        lens: lensInfo,
        colortone: tags.ColorTone,
      };

      allExifData.push(exifData);
    }

    res.status(200).json({
      success: true,
      data: allExifData,
    });
  } catch (error) {
    console.error("Error fetching image data:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.imageConverter = async (req, res) => {
  try {
    const allImages = [];

    for (const imagePath of imagePaths) {
      const tempJpgPath = "./image_EXT.jpg";
      await exiftool.extractPreview(imagePath, tempJpgPath, {
        FileTypeExtension: "jpg",
      });
      const jpgBuffer = await fs.readFile(tempJpgPath);
      const imageBuffer = jpgBuffer.toString("base64");
      await fs.unlink(tempJpgPath);
      allImages.push(imageBuffer);
    }

    res.status(200).json({
      success: true,
      data: allImages,
    });
  } catch (error) {
    console.error("Error fetching image data:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
