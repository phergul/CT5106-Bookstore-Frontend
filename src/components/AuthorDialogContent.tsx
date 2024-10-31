import DialogContent from "@mui/material/DialogContent";
import { Author } from "../types";

type DialogFormProps = {
  author: Author,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function AuthorDialogContent({ author, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="First Name"
          name="firstName"
          value={author.firstName}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Last Name"
          name="lastName"
          value={author.lastName}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="yyyy-mm-dd"
          name="dob"
          value={author.dob}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}
export default AuthorDialogContent;