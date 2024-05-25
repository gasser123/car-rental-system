import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError, ErrorResponse } from "react-router-dom";
function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  let title = "An error occured :(";
  let message = "Something went wrong!";

  if (error.status) {
    if (error.status === 404) {
      title = "404 page not found :(";
      message = "Couldn't find resource or page.";
    } else {
      title = `Error ${error.status}`;
      message = error.data.message;
    }
  }

  return (
    <>
      <MainNavigation />
      <main>
        <PageContent title={title}>
          <p>{message}</p>
        </PageContent>
      </main>
    </>
  );
}

export default ErrorPage;
