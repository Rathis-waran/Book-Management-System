import { Route, Routes } from "react-router-dom";
import UserPage from "../pages/userPage";
import { AdminLogin } from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import AddBook from "../pages/AddBooks";
import AddAuthor from "../pages/AddAuthor";
import AddCategory from "../pages/AddCategory";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProtectedRoute from "./ProtectedRoutes";
import OrdersPage from "../pages/OrdersPage";

export default function routes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/addbooks" element={<AddBook />} />
          <Route path="/addauthor" element={<AddAuthor />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </>
  );
}
