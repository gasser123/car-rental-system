import { LoaderFunction, json } from "react-router-dom";
import Profile from "../components/profile/Profile";

function ProfilePage() {
  return <Profile />;
}

export const loader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:8080/profile", {
    method: "GET",
    credentials: "include",
  });
  const value = await response.json();
  if (!response.ok) {
    throw json({ message: value }, { status: response.status });
  }

  return value;
};

export default ProfilePage;
