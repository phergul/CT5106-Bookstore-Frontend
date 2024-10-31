import DialogContent from "@mui/material/DialogContent";
import { Publisher } from "../types";

type DialogFormProps = {
  publisher: Publisher;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function PublisherDialogContent({ publisher, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <input
        placeholder="Name"
        name="name"
        value={publisher.name}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="Address"
        name="address"
        value={publisher.address}
        onChange={handleChange}
      />
      <br />
    </DialogContent>
  );
}

export default PublisherDialogContent;
