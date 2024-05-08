import express from "express";
import morgan from "morgan";
import cors from "cors";
import { db } from "./db";
import { setupForumEndPoints } from "./forums";

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

setupForumEndPoints(app);

// const PORT = process.env.PORT;
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Forums API listening ar http://localhost:${PORT}`);
});
