import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import LoadingBar from "../components/UI/LoadingBar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import LoggedContext from "../store/logged-context";
function RootPage() {
  const navigation = useNavigation();
  const location = useLocation();
  const loggedContextValue = useContext(LoggedContext);
   useEffect(()=>{
     
   },[location]);  
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
