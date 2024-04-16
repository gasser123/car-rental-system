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
import RecoverPage from "./routes/RecoverPage";
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
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
       path: "/recover",
       element: <RecoverPage /> 
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
