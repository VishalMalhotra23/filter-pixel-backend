require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const imageRoutes = require("./routes/image");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/", imageRoutes);

//strarting a server
app.listen(process.env.PORT || 8000, () => {
  console.log(`app is running at port ${process.env.PORT}`);
});
