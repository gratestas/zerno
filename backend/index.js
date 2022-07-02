import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import refreshRouter from "./routes/refresh.js";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOptions.js";

const PORT = process.env.PORT || 5000;

// create an app
const app = express();

app.use(credentials);

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

//Routes
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use("/api/auth", authRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/users", userRouter);
// enables to read all routes from /routes directory
// fs.readdirSync("./routes").map((route) => app.user("/api", require("./routes" + route)))

//  connect to DB
mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
  )
  .catch((error) => console.log(error.message));
