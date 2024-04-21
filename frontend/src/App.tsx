import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import ErrorPage from "./routes/ErrorPage";
import HomePage from "./routes/HomePage";
import ContactUsPage from "./routes/ContactUsPage";
import AboutUsPage from "./routes/AboutUsPage";
import RegisterPage from "./routes/RegisterPage";
import LogoutPage, { loader as logoutLoader } from "./routes/LogoutPage";
import { action as registerAction } from "./routes/RegisterPage";
import ActivationPage from "./routes/ActivationPage";
import ActivatePage, { loader as activateLoader } from "./routes/ActivatePage";
import ProfilePage, { loader as profileLoader } from "./routes/ProfilePage";
import RecoverPage, { action as recoverAction } from "./routes/RecoverPage";
import PasswordResetPage, {
  action as passwordResetAction,
} from "./routes/PasswordResetPage";
import EditProfilePage, {
  action as editProfileAction,
} from "./routes/EditProfilePage";
import EditEmailPage, {
  action as editEmailAction,
} from "./routes/EditEmailPage";
import ChangePasswordPage, {
  action as changePasswordAction,
} from "./routes/ChangePasswordPage";
import AdminLoginPage from "./routes/AdminLoginPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },

      {
        path: "/contact",
        element: <ContactUsPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
        loader: logoutLoader,
      },
      {
        path: "/activation",
        element: <ActivationPage />,
      },
      {
        path: "/activate",
        element: <ActivatePage />,
        loader: activateLoader,
      },
      {
        path: "/profile",
        loader: profileLoader,
        id: "profile-data",
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "editprofile",
            element: <EditProfilePage />,
            action: editProfileAction,
          },

          {
            path: "editemail",
            element: <EditEmailPage />,
            action: editEmailAction,
          },
        ],
      },
      {
        path: "/recover",
        element: <RecoverPage />,
        action: recoverAction,
      },
      {
        path: "/reset/:token",
        element: <PasswordResetPage />,
        action: passwordResetAction,
      },
      {
        path: "/changepassword",
        element: <ChangePasswordPage />,
        action: changePasswordAction,
      },

      {
        path: "/admin",
        children: [
          {
            index: true,
            element: <AdminLoginPage />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
