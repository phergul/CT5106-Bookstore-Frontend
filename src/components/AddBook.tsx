import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBook } from "../api/booksapi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent";
import { Book } from "../types";

function AddBook() {
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
    mutationFn: addBook,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutation.mutate(book);
    setBook({
      title: "",
      price: 0,
      stock: 0,
      rating: 0,
      releaseDate: "",
      isbn: "",
    });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen}>New Book</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Book</DialogTitle>
        <BookDialogContent book={book} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddBook;