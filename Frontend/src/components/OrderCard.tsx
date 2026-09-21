import "../styles/ordercard.css";

interface OrderItem {
  book_id: number;
  book_title: string;
  image_url: string;
  quantity: number;
  price: number;
}

interface Order {
  order_id: number;
  cart_id: number;
  totalamount: number;
  created_at: string;
  items: OrderItem[];
}

interface ordercardProp {
  order: Order;
  isAdmin?: boolean;
}

const OrderCard = ({ order, isAdmin = false }: ordercardProp) => {
  return (
    <div className="ordercard">
      <div className="header">
        <div>
          <h2>Order Id: {order.order_id}</h2>

          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
        {isAdmin && <span className="label">Cart id: {order.cart_id}</span>}
      </div>
      <div className="orderitems">
        {order.items.map((item) => (
          <div className="orderitem" key={item.book_id}>
            <img
              src={item.image_url}
              alt={item.book_title}
              className="bookimage"
            />

            <div className="order-book-details">
              <h3>{item.book_title}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Item Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-footer">
        <span>Total Amount</span>
        <strong>₹{order.totalamount}</strong>
      </div>
    </div>
  );
};

export default OrderCard;
