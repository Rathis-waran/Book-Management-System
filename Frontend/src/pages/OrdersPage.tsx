import OrderCard from "../components/OrderCard";
import { useFetchOrdersQuery } from "../store/orderSlice";

const OrdersPage = () => {
  const { data } = useFetchOrdersQuery();
  if (!data) {
    return;
  }
  const grouporder: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let order = grouporder.find((order) => order.order_id === item.order_id);

    if (!order) {
      order = {
        order_id: item.order_id,
        cart_id: item.cart_id,
        totalamount: item.totalamount,
        created_at: item.created_at,
        items: [],
      };

      grouporder.push(order);
    }

    order.items.push({
      book_id: item.book_id,
      book_title: item.book_title,
      image_url: item.image_url,
      quantity: item.quantity,
      price: item.price,
    });
  }

  return (
    <div>
      {grouporder.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
