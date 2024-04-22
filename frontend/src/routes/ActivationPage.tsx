import Activation from "../components/account-activation/Activation";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import LoggedContext from "../store/logged-context";
function ActivationPage() {
  const loggedContext = useContext(LoggedContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedContext.user !== "customer") {
      navigate("/");
    }
  }, [loggedContext.user, navigate]);
  return <Activation />;
}

export default ActivationPage;
