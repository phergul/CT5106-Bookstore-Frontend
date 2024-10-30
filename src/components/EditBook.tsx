import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookResponse, Book, BookEntry } from "../types";
import BookDialogContent from "./BookDialogContent";
import { updateBook } from "../api/booksapi";

type FormProps = {
  bookData: BookResponse;
};

function EditBook({ bookData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<Book>({
    title: "",
    price: 0,
    stock: 0,
    rating: 0,
    releaseDate: "",
    isbn: "",
  });

  const mutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
    setBook({
      title: bookData.title,
      price: bookData.price,
      stock: bookData.stock,
      rating: bookData.rating,
      releaseDate: bookData.releaseDate,
      isbn: bookData.isbn,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = bookData._links.self.href;
    const bookEntry: BookEntry = { book, url };
    mutation.mutate(bookEntry);
    setBook({
      title: "",
      price: 0,
      stock: 0,
      rating: 0,
      releaseDate: "",
      isbn: "",
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]:
        name === "price" || name === "stock" || name === "rating"
          ? Number(value)
          : value,
    }));
  };

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit book</DialogTitle>
        <BookDialogContent book={book} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditBook;
