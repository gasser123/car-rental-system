import { Application } from "express";
import {
  validateAdminSignup,
  validateAdminEmail,
  validateLoginInputs,
  changePasswordValidate,
  validateEditAdminSignup
} from "../middlewares/inputValidation";
import {
  register,
  showAdmins,
  removeAdmin,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/adminController";
import { verifyAdminToken } from "../middlewares/jwtValidation";

const adminRoutes = (app: Application) => {
  app.post("/admin/admins", validateAdminSignup, validateAdminEmail, register);
  app.get("/admin/admins", verifyAdminToken, showAdmins);
  app.delete("/admin/admins/:id", verifyAdminToken, removeAdmin);
  app.post("/admin", validateLoginInputs, login);
  app.post("/logout", logout);
  app.get("/admin/profile", verifyAdminToken, getProfile);
  app.patch(
    "/admin/profile",
    verifyAdminToken,
    validateEditAdminSignup,
    updateProfile
  );
  app.patch(
    "/admin/changepassword",
    verifyAdminToken,
    changePasswordValidate,
    changePassword
  );
};

export default adminRoutes;
