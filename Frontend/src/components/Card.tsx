import "../styles/card.css";
import Button from "./Buttons";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  image_url: string;
  stock: number;
}

interface BookCardProps {
  book: Book;
  isAdmin?: boolean;
  onAddToCart?: (book: Book) => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const BookCard = ({
  book,
  isAdmin = false,
  onAddToCart,
  onDelete,
  onEdit,
}: BookCardProps) => {
  return (
    <div className="book-card" key={book.id}>
      <div className="book-image-container" key={book.id}>
        <img src={book.image_url} className="card-img-top" alt={book.title} />

        <span
          className={
            book.stock > 0 ? "stock-badge in-stock" : "stock-badge out-of-stock"
          }
        >
          {book.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>

        <p className="card-text">
          <strong>Author:</strong> {book.author}
        </p>

        <p className="card-price">₹{book.price}</p>

        {isAdmin ? (
          <>
            <Button
              text="Delete"
              onClick={() => onDelete?.(book.id)}
              variant="danger"
            />

            <Button
              text="Edit"
              onClick={() => onEdit?.(book.id)}
              variant="primary"
            />
          </>
        ) : (
          <Button
            text={book.stock > 0 ? "Add to Cart" : "Out of Stock"}
            onClick={() => onAddToCart?.(book)}
            variant={book.stock > 0 ? "addtocart" : "danger"}
            disabled={book.stock === 0}
          />
        )}
      </div>
    </div>
  );
};

export default BookCard;
