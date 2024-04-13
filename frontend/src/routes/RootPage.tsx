import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import LoadingBar from "../components/UI/LoadingBar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import LoggedContext from "../store/logged-context";
import { getCookie } from "../utilities/cookie";
function RootPage() {
  const navigation = useNavigation();
  const location = useLocation();
  const loggedContextValue = useContext(LoggedContext);
   useEffect(()=>{
    const isLoggedIn = getCookie("logged");
    if(!isLoggedIn){
      loggedContextValue.UpdateLogged(null);
    }else {
     if(isLoggedIn === "customer"){
      loggedContextValue.UpdateLogged("customer");
     } else if(isLoggedIn === "admin"){
      loggedContextValue.UpdateLogged("admin");
     } else{
      loggedContextValue.UpdateLogged(null);
     }
    } 
   },[location, loggedContextValue]);  
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
