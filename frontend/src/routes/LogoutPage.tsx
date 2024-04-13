import { json, useNavigate } from "react-router-dom";
import { getCookie } from "../utilities/cookie";
import { useEffect } from "react";
function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("..");
  }, [navigate]);
  return <div></div>;
}

export async function loader() {
  const user = getCookie("logged");
  let response: Response;
  if (user === "customer") {
    response = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (user === "admin") {
    response = await fetch("http://localhost:8080/admin/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return;
  }
  if (!response.ok) {
    throw json(
      { message: "couldn't logout" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    return resData;
  }
}

export default LogoutPage;
