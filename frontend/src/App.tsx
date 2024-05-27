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
import AdminLoginPage, {
  action as adminLoginAction,
} from "./routes/AdminLoginPage";
import AdminProfilePage, {
  loader as adminProfileLoader,
} from "./routes/AdminProfilePage";
import AdminEditProfilePage, {
  action as adminEditProfileAction,
} from "./routes/AdminEditProfilePage";
import AdminDashboardRootPage from "./routes/AdminDashboardRootPage";
import UnconfirmedReservationsPage, {
  loader as UnconfirmedReservationsLoader,
} from "./routes/UnconfirmedReservationsPage";
import DashboardHomePage from "./routes/DashboardHomePage";
import AllReservationsPage, {
  loader as allReservationsLoader,
} from "./routes/AllReservationsPage";
import AllCarsPage, { loader as allCarsLoader } from "./routes/AllCarsPage";
import AddCarPage, { action as addCarAction } from "./routes/AddCarPage";
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
            action: adminLoginAction,
          },

          {
            path: "profile",
            id: "admin-profile-data",
            loader: adminProfileLoader,
            children: [
              {
                index: true,
                element: <AdminProfilePage />,
              },
              {
                path: "editprofile",
                element: <AdminEditProfilePage />,
                action: adminEditProfileAction,
              },
            ],
          },
        ],
      },
      {
        path: "/dashboard",
        element: <AdminDashboardRootPage />,
        loader: adminProfileLoader,
        id: "admin-dashboard-root",
        children: [
          {
            index: true,
            element: <DashboardHomePage />,
          },
          {
            path: "unconfirmed",
            element: <UnconfirmedReservationsPage />,
            loader: UnconfirmedReservationsLoader,
          },
          {
            path: "reservations",
            element: <AllReservationsPage />,
            loader: allReservationsLoader,
          },
          {
            path: "cars",
            element: <AllCarsPage />,
            loader: allCarsLoader,
          },
          {
            path: "addcar",
            element: <AddCarPage />,
            action: addCarAction,
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
