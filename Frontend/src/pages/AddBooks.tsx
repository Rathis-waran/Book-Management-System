import { useEffect, useState } from "react";
import "../styles/addbooks.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addbook } from "../store/adminSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Buttons";
import "../styles/Buttons.css";
import Navbar from "../components/Navbar";
import { fetchAuthors } from "../store/authorSlice";
import { fetchCategories } from "../store/categorySlice";
import { editBooks } from "../api/apis";

export default function AddBook() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image_url, setImage_url] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const author = useAppSelector((state) => state.author.author);
  const location = useLocation();
  const editingBook = location.state?.book;
  const isEditing = !!editingBook;
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.category.categoy);

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setPrice(editingBook.price);
      setStock(editingBook.stock);
      setImage_url(editingBook.image_url);
      const selectedAuthor = author.find((a) => a.name === editingBook.author);

      const selectedCategory = categories.find(
        (c) => c.cat_name === editingBook.category,
      );

      if (selectedAuthor) {
        setAuthorId(String(selectedAuthor.id));
      }

      if (selectedCategory) {
        setCategoryId(String(selectedCategory.id));
      }
    }
  }, [editingBook, categories, author]);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const bookData: any = {
    title,
    price,
    stock,
    author_id: Number(authorId),
    category_id: Number(categoryId),
    image_url,
  };
  const update = async (bookId: number) => {
    if (isEditing) {
      await editBooks(bookData, bookId);
      setTitle("");
      setPrice(0);
      setStock(0);
      setImage_url("");

      alert("Book Updated Successfully!!");
    } else {
      await dispatch(addbook(bookData)).unwrap();
    }
    navigate("/adminpage");
  };

  return (
    <>
      <Navbar isAdmin={true} />
      <div className="add-book-container">
        <div className="add-book-card">
          <h2>Add Book</h2>

          <div className="form-group">
            <label>Book Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>

            <select
              id="author"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              required
            >
              <option value="">Select Author</option>

              {author.map((authores) => (
                <option key={authores.id} value={authores.id}>
                  {authores.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.cat_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              min={0}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>

            <input
              id="stock"
              type="number"
              placeholder="Enter stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              min={0}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              id="image"
              type="text"
              placeholder="Enter Image URL"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
              required
            />
          </div>

          <Button
            text={isEditing ? "Update Book" : "Add Book"}
            onClick={() => {
              if (isEditing) {
                update(editingBook.id);
              } else {
                dispatch(addbook(bookData)).unwrap();
              }
            }}
            variant={isEditing ? "primary" : "success"}
          />
        </div>
      </div>
    </>
  );
}
