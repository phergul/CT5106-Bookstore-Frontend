import { Author, AuthorEntry, AuthorResponse } from "../types";
import axios from "axios";

export const getAuthors = async (): Promise<AuthorResponse[]> => {
  const response = await axios.get(`http://localhost:8080/api/authors`);
  return response.data._embedded.authors;
};

export const deleteAuthor = async (link: string): Promise<AuthorResponse> => {
  const response = await axios.delete(link);
  return response.data;
};

export const addAuthor = async (author: Author): Promise<AuthorResponse> => {
  const response = await axios.post(
    `http://localhost:8080api/authors`,
    author,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

export const updateAuthor = async (authorEntry: AuthorEntry): Promise<AuthorResponse> => {
  const response = await axios.put(authorEntry.url, authorEntry.author, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
