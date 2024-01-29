import { Application } from "express";
import { validateAdminSignup, validateAdminEmail, validateLoginInputs } from "../middlewares/inputValidation";
import { register, showAdmins, removeAdmin, login, logout, getProfile, updateProfile} from "../controllers/adminController";
import { verifyAdminToken } from "../middlewares/jwtValidation";

const adminRoutes = (app: Application) => {
    app.post("/admin/admins", validateAdminSignup, validateAdminEmail, register);
    app.get("/admin/admins", verifyAdminToken,showAdmins);
    app.delete("/admin/admins/:id", verifyAdminToken, removeAdmin);
    app.post("/admin", validateLoginInputs, login);
    app.post("/logout", logout);
    app.get("/admin/profile", verifyAdminToken, getProfile);
    app.patch(
      "/admin/profile",
      verifyAdminToken,
      validateAdminEmail,
      validateAdminSignup,
      updateProfile
    );
   
  };
  
  export default adminRoutes;