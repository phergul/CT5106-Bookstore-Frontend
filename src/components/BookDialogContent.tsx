import DialogContent from "@mui/material/DialogContent";
import { Book } from "../types";

type DialogFormProps = {
  book: Book,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BookDialogContent({ book, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Title"
          name="title"
          value={book.title}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Price"
          name="price"
          value={book.price == 0 ? undefined : book.price}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Stock"
          name="stock"
          value={book.stock == 0 ? undefined : book.stock}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Rating"
          name="rating"
          value={book.rating == 0 ? undefined : book.rating}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="yyyy-mm-dd"
          name="releaseDate"
          value={book.releaseDate}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="ISBN"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}
export default BookDialogContent;
