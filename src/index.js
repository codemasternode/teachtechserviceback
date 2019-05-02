import express from "express";
import bodyParser from "body-parser";
import path from "path";
import "dotenv/config";
import cors from "cors";
import mailer, { sendMail } from "./config/nodemailer";
import models, { sequelize } from "./config/dbConfig";
import redis from "./config/redisConfig";
import indexRoutes from "./routes";
import color from "colors";
import { sendEmailVerification } from "./services/mailer";

// process.on("uncaughtException", err => {});

const app = express(),
  PORT = process.env.PORT || 3000,
  POSTGRES_DATABASE = process.env.POSTGRES_DATABASE,
  POSTGRES_USERNAME = process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

const router = express.Router();
let routes = indexRoutes(router);

if (!PORT || !POSTGRES_DATABASE || !POSTGRES_USERNAME || !POSTGRES_PASSWORD) {
  throw new Error("There is no env variable !!!");
}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log(
      "[POSTGRESQL] Connection has been successful established".yellow
    );
  })
  .catch(err => {
    console.log("[POSTGRESQL] Problem with established connection".red);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send({ ok: "working" });
});

app.use("/auth", routes.authRouter);

app.listen(PORT, () => {
  console.log(`Application is running on port: ${PORT}`.green);
});
