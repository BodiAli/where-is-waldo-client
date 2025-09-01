import { Outlet } from "react-router";
import Header from "../Header/Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
