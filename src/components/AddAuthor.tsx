import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AuthorDialogContent from "./AuthorDialogContent";
import { Author } from "../types";
import { addAuthor } from "../api/authorsapi";

function AddAuthor() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState<Author>({
    firstName: "",
    lastName: "",
    dob: "",
  });

  const mutation = useMutation({
    mutationFn: addAuthor,
    onSuccess: () => {
      setOpen(true);
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
    setAuthor({ ...author, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutation.mutate(author);
    setAuthor({
      firstName: "",
      lastName: "",
      dob: "",
    });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen}>New Author</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Author</DialogTitle>
        <AuthorDialogContent author={author} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddAuthor;
