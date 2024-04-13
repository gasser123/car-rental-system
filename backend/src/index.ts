import express from "express";
import cookieParser from "cookie-parser";
import customerRoutes from "./routes/customerRoutes";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes";
import carRoutes from "./routes/carRoutes";
import pickupLocationRoutes from "./routes/pickupLocationRoutes";
import returnLocationRoutes from "./routes/returnLocationRoutes";
import userVerificationRoutes from "./routes/userVerificationRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import passwordResetRoutes from "./routes/passwordResetRoutes";
import cors from "cors";
dotenv.config();
const { SERVER_PORT } = process.env;
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
adminRoutes(app);
customerRoutes(app);
carRoutes(app);
pickupLocationRoutes(app);
returnLocationRoutes(app);
userVerificationRoutes(app);
reservationRoutes(app);
passwordResetRoutes(app);
const port = parseInt(SERVER_PORT as unknown as string);
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
