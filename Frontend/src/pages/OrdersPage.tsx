import { useState } from "react";
import OrderCard from "../components/OrderCard";
import { useFetchOrdersQuery } from "../store/orderSlice";
import "../styles/pagination.css";
const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data } = useFetchOrdersQuery({
    page,
    limit,
  });

  if (!data) {
    return "data not found";
  }

  const orders = data.orders ?? [];
  const grouporder: any[] = [];

  for (let i = 0; i < orders.length; i++) {
    const item = orders[i];

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

  const totalPages = data.orderpages ?? 0;
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div>
      {grouporder.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
      <div className="pagination">
        <button
          className="incdecbutton"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        {pages.map((pagenum) => (
          <button
            className={page === pagenum ? "pagesbutton" : ""}
            key={pagenum}
            onClick={() => setPage(pagenum)}
          >
            {pagenum}
          </button>
        ))}
        <button
          className="incdecbutton"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
