import { BookResponse, Book, BookEntry } from "../types";
import axios from "axios";

const apiUrl: string = "http://localhost:8080";

export const getBooks = async (): Promise<BookResponse[]> => {
  const response = await axios.get(`${apiUrl}/api/books`);
  return response.data._embedded.books;
};

export const deleteBook = async (link: string): Promise<BookResponse> => {
  const response = await axios.delete(link);
  return response.data;
};

export const addBook = async (book: Book): Promise<BookResponse> => {
  const response = await axios.post(
    `${apiUrl}/api/books`,
    book,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

export const updateBook = async (bookEntry: BookEntry): Promise<BookResponse> => {
  const response = await axios.put(bookEntry.url, bookEntry.book, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};