import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";
import LoadingBar from "../components/UI/LoadingBar";
import Footer from "../components/Footer";
function RootPage() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" ? <LoadingBar /> : null}
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootPage;
