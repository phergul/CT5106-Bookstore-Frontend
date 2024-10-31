import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePublisher, getPublishers } from "../api/publisersapi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import AddPublisher from "./AddPublisher";
import EditPublisher from "./EditPublisher";

const GetPublishers = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    data = [],
    isError,
    isLoading,
    isSuccess,
  } = useQuery({ queryKey: ["publishers"], queryFn: getPublishers });

  const mutation = useMutation({
    mutationFn: deletePublisher,
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "address", headerName: "Address", width: 400 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditPublisher publisherData={params.row} />
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
              window.confirm(
                `Are you sure you want to delete ${params.row.name}?`
              )
            ) {
              mutation.mutate(params.row._links.publisher.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error fetching publishers...</span>;

  return isSuccess ? (
    <>
      <AddPublisher />
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
        message="Publisher Deleted"
      />
    </>
  ) : null;
};

export default GetPublishers;
