import InfoForm from "../components/InfoForm";
import HomeInfo from "../components/HomeInfo";
import { ActionFunctionArgs, json } from "react-router-dom";
function HomePage() {
  return (
    <>
      <InfoForm />
      <HomeInfo />
    </>
  );
}

export async function action(actionArgs: ActionFunctionArgs) {
  const { request } = actionArgs;
  // get the submitted form data
  const data = await request.formData();
  const method = request.method;
  let url = "http://localhost:8080/cars?availableOnly=true";
  // get function gets the entered data for the corresponding input name
  // passed as parameter
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "couldn't save event" }, { status: 500 });
  }

}

export default HomePage;
