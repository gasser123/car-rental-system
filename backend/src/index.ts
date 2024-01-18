import express from "express";
import cookieParser from "cookie-parser";
import customerRoutes from "./controllers/customerController";
import dotenv from "dotenv";
dotenv.config();
const {SERVER_PORT} = process.env;
const app = express();
app.use(express.json());
app.use(cookieParser());
customerRoutes(app);
const port = parseInt(SERVER_PORT as unknown as string);
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
