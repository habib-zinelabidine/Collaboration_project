import { useSelector } from "react-redux";
import {  Navigate, Outlet } from "react-router-dom";
import SignIn from "../pages/Auth/components/SignInForm";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state["user"]);
  const user = localStorage.getItem("dataKey");

  return currentUser ? <Outlet/> : <Navigate to="/signin"/>;
  
}
