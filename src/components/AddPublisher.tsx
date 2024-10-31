import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import PublisherDialogContent from "./PublisherDialogContent";
import { Publisher } from "../types";
import { addPublisher } from "../api/publisersapi";

function AddPublisher() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [publisher, setPublisher] = useState<Publisher>({
    name: "",
    address: "",
  });

  const mutation = useMutation({
    mutationFn: addPublisher,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPublisher({ ...publisher, [event.target.name]: event.target.value });
  const handleSave = () => {
    mutation.mutate(publisher);
    setPublisher({ name: "", address: "" });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen}>New Publisher</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Publisher</DialogTitle>
        <PublisherDialogContent
          publisher={publisher}
          handleChange={handleChange}
        />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddPublisher;
