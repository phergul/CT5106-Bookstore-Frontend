import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthorResponse, Author, AuthorEntry } from "../types";
import { updateAuthor } from "../api/authorsapi";
import AuthorDialogContent from "./AuthorDialogContent";

type FormProps = {
  authorData: AuthorResponse;
};

function EditAuthor({ authorData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState<Author>({
    firstName: "",
    lastName: "",
    dob: "",
  });

  const mutation = useMutation({
    mutationFn: updateAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
    setAuthor({
      firstName: authorData.firstName,
      lastName: authorData.lastName,
      dob: authorData.dob,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = authorData._links.self.href;
    const authorEntry: AuthorEntry = { author, url };
    mutation.mutate(authorEntry);
    setAuthor({
        firstName: "",
        lastName: "",
        dob: "",
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor({ ...author, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit author</DialogTitle>
        <AuthorDialogContent author={author} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditAuthor;
