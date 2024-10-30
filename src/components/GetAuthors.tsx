// eslint-disable-next-line

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAuthor, getAuthors } from "../api/authorsapi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import AddAuthor from "./AddAuthor";
import EditAuthor from "./EditAuthor";

const GetAuthors = () => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data = [], isError, isLoading, isSuccess } = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  const mutation = useMutation({
    mutationFn: deleteAuthor,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "dob", headerName: "Date of birth", width: 200 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditAuthor authorData={params.row} />,
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
                `Are you sure you want to delete ${params.row.make} ${params.row.model}?`
              )
            ) {
              mutation.mutate(params.row._links.author.href);
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
    return <span>Error when fetching authors...</span>;
  } else if (isSuccess) {
    return (
      <>
        <AddAuthor />
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
          message="Author Deleted"
        />
      </>
    );
  }
}

export default GetAuthors;
