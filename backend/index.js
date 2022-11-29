import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { uploadFile, getFile } from "./s3.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }));
app.use(express.static("images"));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/upload", (req, res) => {
  // console.log(req.files["photo"]);
  uploadFile(req.files["photo"]);
  res.send("archivo subido");
});
app.get("/photo/:fileName", async (req, res) => {
  try {
    const result = await getFile(req.params.fileName);
    res.send("Imagen descargada");
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
