import { useEffect } from "react";
import "../styles/cartpage.css";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCart,
  updateCartQuantity,
  removeCartItem,
  cleanUpCart,
} from "../store/cartSlice";
import Button from "../components/Buttons";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const cartId = 1;

  useEffect(() => {
    dispatch(fetchCart(cartId));
  }, [dispatch]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    const item = cartItems.find((item) => item.id === id);

    if (!item) {
      return;
    }

    if (quantity > item.stock) {
      alert(`Only ${item.stock} items are available in stock.`);
      return;
    }

    dispatch(
      updateCartQuantity({
        id,
        quantity,
      }),
    );
  };

  const removeItem = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const clearCart = () => {
    dispatch(cleanUpCart(cartId));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="content">
          {cartItems.length === 0 ? (
            <h2 className="cart-message">Your cart is empty</h2>
          ) : (
            <div className="items">
              {cartItems.map((item) => (
                <div
                  className="card"
                  key={item.id}
                  style={{
                    height: "150px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div className="image">
                    <img src={item.image_url} alt={item.title} />
                  </div>

                  <div className="details">
                    <h2>{item.title}</h2>

                    <p className="price">₹{Number(item.price).toFixed(2)}</p>

                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="total">
                      Total: ₹{(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="actions">
                    <Button
                      text={"Remove"}
                      onClick={() => removeItem(item.id)}
                      variant={"danger"}
                    />
                  </div>
                </div>
              ))}

              <div className="cart-summary">
                <h2>Cart Summary</h2>

                <p id="item">
                  Total Items: <strong>{cartItems.length}</strong>
                </p>

                <p id="amount">
                  Total Amount: <strong>₹{totalAmount.toFixed(2)}</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="cart-btn-container">
        <div className="nav-button">
          <Button
            text={"Add More Item"}
            onClick={() => navigate("/")}
            variant={"primary"}
          />

          <Button
            text={"Checkout"}
            onClick={() => {
              if (cartItems.length > 0) {
                navigate("/checkout");
              } else {
                alert("Add item to Check Out");
              }
            }}
            variant={"success"}
          />

          <Button text={"Clear Cart"} onClick={clearCart} variant={"danger"} />
        </div>
      </div>
    </>
  );
};

export default CartPage;
