import { Review, ReviewEntry, ReviewResponse } from "../types";
import axios from "axios";

export const getReviews = async (): Promise<ReviewResponse[]> => {
  const response = await axios.get(`http://localhost:8080/api/reviews`);
  return response.data._embedded.reviews;
};

export const deleteReview = async (link: string): Promise<ReviewResponse> => {
  const response = await axios.delete(link);
  return response.data;
};

export const addReview = async (review: Review): Promise<ReviewResponse> => {
  const response = await axios.post(
    `http://localhost:8080/api/reviews`,
    review,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const updateReview = async (reviewEntry: ReviewEntry): Promise<ReviewResponse> => {
  const response = await axios.put(reviewEntry.url, reviewEntry.review, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
