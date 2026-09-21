import Navbar from "../components/Navbar";
import HeroPage from "../pages/heroPage";
import BookCard from "../components/Card";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import BookSearch from "../components/SearchBooks";
import { fetchBooks } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";
import { addtocart } from "../api/apis";
import { fetchCart } from "../store/cartSlice";
import "../styles/pagination.css";
const UserPage = () => {
  const dispatch = useAppDispatch();
  const { books, totalPages } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    dispatch(fetchBooks({ page, limit, search }));
  }, [dispatch, page]);

  const [search, setSearch] = useState("");

  const filteredBooks = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(
      fetchBooks({
        page,
        limit: 10,
        search,
      }),
    );
  }, [dispatch, page, search]);
  async function addtocarts(Book: any) {
    try {
      const book = books.find((book) => book.id === Book.id);

      if (!book) {
        alert("Book not found");
        return;
      }

      if (book.stock <= 0) {
        alert("Stocks are less");
        return;
      }

      await addtocart(Book);
      await dispatch(fetchCart(1));
      alert("Book added to cart");
    } catch (error) {
      alert("Unable to add the book");
    }
  }
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div>
      <HeroPage />
      <Navbar />
      <BookSearch onSearch={filteredBooks} />
      <div
        className="book-container"
        style={{
          marginTop: "75px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} onAddToCart={addtocarts} />
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        {pages.map((pageNumber) => (
          <button key={pageNumber} onClick={() => setPage(pageNumber)}>
            {pageNumber}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserPage;
