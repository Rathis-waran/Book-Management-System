import { useEffect, useState } from "react";
import "../styles/checkoutpage.css";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "../components/Buttons";
import { useNavigate } from "react-router-dom";
import { getCoupon, updateStatus } from "../store/couponSlice";
import type { RootState } from "../store/store";
import { reduceStocks } from "../store/adminSlice";
import { cleanUpCart } from "../store/cartSlice";
import { useAddOrderMutation } from "../store/orderSlice";

interface Coupon {
  id: number;
  couponcode: string;
  discountpercentage: number;
}

const CheckoutPage = () => {
  const { coupon } = useAppSelector((state: RootState) => {
    return state.coupon;
  });

  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [selcoupon, setselcoupon] = useState<Coupon | null>(null);
  const [addOrder] = useAddOrderMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  const totamnt = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const applycoupon = (coupon: Coupon) => {
    if (selcoupon?.id === coupon.id) {
      setselcoupon(null);
      return;
    }
    setselcoupon(coupon);
  };

  const discountprice = selcoupon
    ? (totamnt * selcoupon.discountpercentage) / 100
    : 0;

  const totalamount = totamnt - discountprice;

  const placeorder = async () => {
    try {
      for (const item of cartItems) {
        await dispatch(
          reduceStocks({
            bookId: item.book_id,
            quantity: item.quantity,
          }),
        ).unwrap();
      }

      await addOrder({
        cart_id: cartItems[0].cart_id,
        totalamount: totalamount,
        items: cartItems.map((item) => ({
          book_id: item.book_id,
          quantity: item.quantity,
          price: item.price,
        })),
      }).unwrap();

      if (selcoupon) {
        await dispatch(updateStatus(selcoupon.id)).unwrap();
      }
      dispatch(cleanUpCart(1));
      alert("Oreder Placed Successfully");
    } catch (error) {
      alert("Unable to place order");
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="checkout-empty">
          <h2>Your cart is empty</h2>

          <Button
            text="Add Items"
            onClick={() => navigate("/")}
            variant="primary"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-card book-section">
          <h2>Order Items</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img src={item.image_url} alt={item.title} />

              <div className="checkout-item-details">
                <h3>{item.title}</h3>

                <p>Price: ₹{Number(item.price).toFixed(2)}</p>

                <p>Quantity: {item.quantity}</p>

                <strong>
                  Total: ₹{(Number(item.price) * item.quantity).toFixed(2)}
                </strong>
              </div>
            </div>
          ))}
        </div>

        {coupon.length > 0 ? (
          <div className="checkout-card coupon-section">
            <h2>Available Coupons</h2>

            {coupon.map((coupons) => {
              const isSelected = selcoupon?.id === coupons.id;
              const isDisabled = selcoupon !== null && !isSelected;
              return (
                <div
                  key={coupons.id}
                  className={`coupon-card ${
                    isSelected ? "selected" : ""
                  } ${isDisabled ? "disabled" : ""}`}
                >
                  <div className="coupon-details">
                    <h4>{coupons.couponcode}</h4>

                    <p>Get {coupons.discountpercentage}% OFF</p>
                  </div>

                  <button
                    disabled={isDisabled}
                    onClick={() => applycoupon(coupons)}
                  >
                    Apply
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          "There is no coupon Right Now"
        )}

        <div className="checkout-card price-summary">
          <h2>Price Summary</h2>

          <div className="">
            <span>Total Items </span>
            <strong>: {cartItems.length}</strong>
          </div>

          <div className="">
            <span>Subtotal </span>
            <strong>: ₹{totamnt}</strong>
          </div>

          {selcoupon && (
            <div className=" discount">
              <span>Discount ({selcoupon.discountpercentage}%)</span>

              <strong>- ₹{discountprice}</strong>
            </div>
          )}

          <div className=" final-total">
            <span>Total Amount </span>
            <strong>: ₹{totalamount}</strong>
          </div>

          {selcoupon && (
            <p className="applied-message">
              Coupon <strong>{selcoupon.couponcode}</strong> applied
              successfully!
            </p>
          )}

          <div className="checkout-buttons">
            <Button
              text="Back to Cart"
              onClick={() => navigate("/cart")}
              variant="danger"
            />

            <Button text="Place Order" onClick={placeorder} variant="success" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
