import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <h1>Content</h1>
        <Outlet />
      </main>
      <CartOverview />
    </>
  );
}
