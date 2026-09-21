import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import "../styles/navbar.css";
import { fetchCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isAdmin?: boolean;
}
const Navbar = ({ isAdmin = false }: NavbarProps) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart(1));
  }, [dispatch]);

  function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/", { replace: true });
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {!isAdmin ? (
          <a href="/" className="navbar-brand">
            BookStore
          </a>
        ) : (
          <a href="/adminpage" className="navbar-brand">
            BookStore
          </a>
        )}

        {isAdmin ? (
          <>
            <div className="navbar-links">
              <a href="/adminpage">Books</a>
              <a href="/addbooks">Add Books</a>
              <a href="/addauthor">Add Authors</a>
              <a href="/addcategory">Add Categories</a>
              <a href="/orders">Orders</a>
            </div>

            <a
              href="/"
              className="logout"
              onClick={() => {
                logout();
              }}
            >
              LogOut
            </a>
          </>
        ) : (
          <div className="navbar-links">
            <div className="cart-count">
              <a href="/cart">Cart</a>
              <div id="count">{cartItems.length}</div>
            </div>
            <a href="/orders">Orders</a>
            <a id="navbar-link" href="/Login">
              Admin Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
