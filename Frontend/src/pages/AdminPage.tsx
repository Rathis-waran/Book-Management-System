import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchBooks } from "../store/userSlice";
import BookSearch from "../components/SearchBooks";
import BookCard from "../components/Card";
import Navbar from "../components/Navbar";
import "../styles/adminpage.css";
import { deletebook } from "../store/adminSlice";
import { useNavigate } from "react-router-dom";
function Card() {
  const dispatch = useDispatch<AppDispatch>();
  const { books, totalPages } = useSelector((state: RootState) => state.user);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
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

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteId === null) {
      return;
    }
    dispatch(deletebook(deleteId));
    dispatch(fetchBooks({ page, limit, search }));
    setDeleteId(null);
  }, [deleteId, dispatch, page]);

  const edit = (id: number) => {
    const book = books.find((book) => book.id === id);

    if (book) {
      navigate("/addbooks", {
        state: {
          book,
        },
      });
    }
  };

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <>
      <Navbar isAdmin={true} />
      <BookSearch onSearch={filteredBooks} />

      <div className="book-container">
        {books.map((book) => (
          <>
            <BookCard
              key={book.id}
              book={book}
              isAdmin={true}
              onDelete={(id) => {
                setDeleteId(id);
              }}
              onEdit={edit}
            />
          </>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        {pages.map((pagenum) => (
          <button key={pagenum} onClick={() => setPage(pagenum)}>
            {pagenum}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Card;
