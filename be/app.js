import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import routes from "./routes/index.js";

dotenv.config();
const app = express();

(async () => {
  mongoose.connection.on("error", () => {
    console.error.bind(console, "MongoDB Connection Error: ");
    process.exit(1);
  });
  mongoose.connection.on("open", () =>
    console.log("Connection to Mongo successful")
  );

  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`App started successfully on port ${process.env.PORT}`);
});
