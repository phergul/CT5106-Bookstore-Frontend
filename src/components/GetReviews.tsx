import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview, getReviews } from "../api/reviewsapi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import AddReview from "./AddReview";
import EditReview from "./EditReview";

const GetReviews = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    data = [],
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  const mutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "rating", headerName: "Rating", width: 100 },
    { field: "comment", headerName: "Comment", width: 500 },
    { field: "reviewDate", headerName: "Review Date", width: 200 },
    { field: ".book.isbn", headerName: "Book ISBN", width: 200 },
    { field: "._links.href.book.title", headerName: "Book Title", width: 200 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditReview reviewData={params.row} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            if (
              window.confirm(`Are you sure you want to delete this review?`)
            ) {
              mutation.mutate(params.row._links.review.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error fetching reviews...</span>;

  return isSuccess ? (
    <>
      <AddReview />
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={(row) => row._links.self.href}
        slots={{ toolbar: GridToolbar }}
      />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Review Deleted"
      />
    </>
  ) : null;
};

export default GetReviews;
