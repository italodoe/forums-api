import express from "express";
import morgan from "morgan";
import cors from "cors";
import forumRoutes from "./forums"
import { defaultErrorHandler } from "./errors";

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //parses req to json


app.use("/forums", forumRoutes)
app.use(defaultErrorHandler)

// const PORT = process.env.PORT;
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Forums API listening ar http://localhost:${PORT}`);
});
