var express = require("express");
var router = express.Router();

const { imagesData, imageConverter } = require("../controller/image");

router.get("/getimagesdata", imagesData);

router.get("/getimages", imageConverter);

module.exports = router;
