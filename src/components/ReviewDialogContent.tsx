import DialogContent from "@mui/material/DialogContent";
import { Review } from "../types";

type DialogFormProps = {
  review: Review;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ReviewDialogContent({ review, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <input
        placeholder="Rating"
        name="rating"
        type="number"
        value={review.rating == 0 ? undefined : review.rating}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="Comment"
        name="comment"
        value={review.comment}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="yyyy-mm-dd"
        name="reviewDate"
        value={review.reviewDate}
        onChange={handleChange}
      />
      <br />
    </DialogContent>
  );
}

export default ReviewDialogContent;
