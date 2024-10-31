import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ReviewDialogContent from "./ReviewDialogContent";
import { Review } from "../types";
import { addReview } from "../api/reviewsapi";

function AddReview() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState<Review>({
    rating: 0,
    comment: "",
    reviewDate: "",
  });

  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setReview({ ...review, [event.target.name]: event.target.value });

  const handleSave = () => {
    mutation.mutate(review);
    setReview({ rating: 0, comment: "", reviewDate: "" });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen}>New Review</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Review</DialogTitle>
        <ReviewDialogContent review={review} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddReview;
