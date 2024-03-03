import { useReducer } from "react";
import LoggedContext, { UserLogged, UserLoggedContext } from "./logged-context";
interface Props {
  children?: React.ReactNode;
}
type LoggedAction = {
  type: string;
  value: UserLogged;
};
const loggedReducer: React.Reducer<UserLogged, LoggedAction> = (
  _prevState,
  action
) => {
  if (action.type === "UPDATE") {
    return action.value;
  }
  return null;
};

const LoggedContextProvider: React.FC<Props> = (props) => {
  const [loggedIn, dispatchLoggedAction] = useReducer(loggedReducer, null);
  const updateLoggedHandler = (value: UserLogged) => {
    dispatchLoggedAction({
      type: "UPDATE",
      value: value,
    });
  };

  const contextValue: UserLoggedContext={
   user: loggedIn,
   UpdateLogged:  updateLoggedHandler 
  }
  return <LoggedContext.Provider value={contextValue}>{props.children}</LoggedContext.Provider>;
};

export default LoggedContextProvider;
