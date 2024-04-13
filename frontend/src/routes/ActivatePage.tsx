import { LoaderFunction, redirect, json } from "react-router-dom";
import Activate from "../components/account-activation/Activate";
function ActivatePage() {
  return <Activate />;
}
export const loader: LoaderFunction = async (args) => {
  const { request } = args;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return redirect("/");
  }
  const response = await fetch(
    `http://localhost:8080/activation?token=${token}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const responseMessage = await response.json();
  if (!response.ok) {
    throw json({ message: responseMessage }, { status: response.status });
  }

  return responseMessage;
};

export default ActivatePage;
