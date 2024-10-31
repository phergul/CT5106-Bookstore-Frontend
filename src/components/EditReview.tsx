import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewResponse, Review, ReviewEntry } from "../types";
import ReviewDialogContent from "./ReviewDialogContent";
import { updateReview } from "../api/reviewsapi";

type FormProps = {
  reviewData: ReviewResponse;
};

function EditReview({ reviewData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [review, setReview] = useState<Review>({
    rating: 0,
    comment: "",
    reviewDate: "",
  });

  const mutation = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setReview({
      rating: reviewData.rating,
      comment: reviewData.comment,
      reviewDate: reviewData.reviewDate,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = reviewData._links.self.href;
    const reviewEntry: ReviewEntry = { review, url };
    mutation.mutate(reviewEntry);
    setReview({
      rating: 0,
      comment: "",
      reviewDate: "",
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Review</DialogTitle>
        <ReviewDialogContent review={review} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditReview;
