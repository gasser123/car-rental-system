import { createContext } from "react";

export type UserLogged = "customer" | "admin" | null;
export interface UserLoggedContext{
user: UserLogged;
UpdateLogged: (value: UserLogged)=>void;    
}
const LoggedContext = createContext<UserLoggedContext>({
 user: null,
 UpdateLogged:()=>{}   
});

export default LoggedContext;