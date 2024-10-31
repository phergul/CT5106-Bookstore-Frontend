import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublisherResponse, Publisher, PublisherEntry } from "../types";
import PublisherDialogContent from "./PublisherDialogContent";
import { updatePublisher } from "../api/publisersapi";

type FormProps = {
  publisherData: PublisherResponse;
};

function EditPublisher({ publisherData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [publisher, setPublisher] = useState<Publisher>({
    name: "",
    address: "",
  });

  const mutation = useMutation({
    mutationFn: updatePublisher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setPublisher({
      name: publisherData.name,
      address: publisherData.address,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = publisherData._links.self.href;
    const publisherEntry: PublisherEntry = { publisher, url };
    mutation.mutate(publisherEntry);
    setPublisher({
      name: "",
      address: "",
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPublisher((prevPublisher) => ({
      ...prevPublisher,
      [name]: value,
    }));
  };

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Publisher</DialogTitle>
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

export default EditPublisher;
