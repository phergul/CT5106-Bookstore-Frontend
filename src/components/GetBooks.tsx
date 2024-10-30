import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook, getBooks } from "../api/booksapi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import EditBook from "./EditBook";
import AddBook from "./AddBook";
import { Snackbar } from "@mui/material";


const GetBooks = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data = [], isError, isLoading, isSuccess } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
  

  const columns: GridColDef[] = [
    { field: "isbn", headerName: "ISBN", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "rating", headerName: "Rating", width: 150 },
    { field: "releaseDate", headerName: "Release Date", width: 150 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditBook bookData={params.row} />,
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
              window.confirm(
                `Are you sure you want to delete ${params.row.title}?`
              )
            ) {
              mutation.mutate(params.row._links.book.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    return <span>Error when fetching books...</span>;
  } else if (isSuccess) {
    return (
      <>
        <AddBook />
        <DataGrid
          rows={data}
          columns={columns}
          // option if you don't want to highlight selected row
          disableRowSelectionOnClick={true}
          //all rows must have unique id defined using getRowId
          getRowId={(row) => row._links.self.href}
          // sets toolbar
          slots={{ toolbar: GridToolbar }}
        />

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </>
    );
  }
}

export default GetBooks;
