import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
function RootPage() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" ? <p>Loading...</p> : null}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootPage;
