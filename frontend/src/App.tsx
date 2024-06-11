import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./routes/RootPage";
import ErrorPage from "./routes/ErrorPage";
import HomePage, { loader as homePageLoader } from "./routes/HomePage";
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
import EditCarPage, {
  loader as editCarLoader,
  action as editCarAction,
} from "./routes/EditCarPage";
import AllPickupLocationsPage, {
  loader as allPickupLoader,
} from "./routes/AllPickupLocationsPage";
import AddPickupLocationPage, {
  action as addPickupAction,
} from "./routes/AddPickupLocationPage";
import EditPickupLocationPage, {
  loader as editPickupLoader,
  action as editPickupAction,
} from "./routes/EditPickupLocationPage";
import AllReturnLocationsPage, {
  loader as allReturnLoader,
} from "./routes/AllReturnLocationsPage";
import EditReturnLocationPage, {
  loader as editReturnLoader,
  action as editReturnAction,
} from "./routes/EditReturnLocationPage";
import AddReturnLocationPage, {
  action as addReturnAction,
} from "./routes/AddReturnLocationPage";
import AllAdminsPage, {
  loader as allAdminsLoader,
} from "./routes/AllAdminsPage";
import AddAdminPage, { action as addAdminAction } from "./routes/AddAdminPage";
import DeleteAdminPage, {
  loader as deleteAdminLoader,
  action as deleteAdminAction,
} from "./routes/DeleteAdminPage";
import CarsPage, { loader as carsLoader } from "./routes/CarsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        element: <HomePage />,
        index: true,
        loader: homePageLoader,
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
            children: [
              {
                index: true,
                element: <AllCarsPage />,
                loader: allCarsLoader,
              },
              {
                path: ":id/edit",
                element: <EditCarPage />,
                loader: editCarLoader,
                action: editCarAction,
              },
            ],
          },
          {
            path: "addcar",
            element: <AddCarPage />,
            action: addCarAction,
          },
          {
            path: "pickuplocations",
            children: [
              {
                index: true,
                element: <AllPickupLocationsPage />,
                loader: allPickupLoader,
              },
              {
                path: ":id/edit",
                element: <EditPickupLocationPage />,
                loader: editPickupLoader,
                action: editPickupAction,
              },
            ],
          },
          {
            path: "addpickuplocation",
            element: <AddPickupLocationPage />,
            action: addPickupAction,
          },
          {
            path: "returnlocations",
            children: [
              {
                index: true,
                element: <AllReturnLocationsPage />,
                loader: allReturnLoader,
              },
              {
                path: ":id/edit",
                element: <EditReturnLocationPage />,
                loader: editReturnLoader,
                action: editReturnAction,
              },
            ],
          },
          {
            path: "addreturnlocation",
            element: <AddReturnLocationPage />,
            action: addReturnAction,
          },
          {
            path: "admins",
            children: [
              {
                index: true,
                element: <AllAdminsPage />,
                loader: allAdminsLoader,
              },
              {
                path: ":id/delete",
                element: <DeleteAdminPage />,
                loader: deleteAdminLoader,
                action: deleteAdminAction,
              },
            ],
          },
          {
            path: "addadmin",
            element: <AddAdminPage />,
            action: addAdminAction,
          },
        ],
      },
      {
        path: "/cars",
        element: <CarsPage />,
        loader: carsLoader,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
