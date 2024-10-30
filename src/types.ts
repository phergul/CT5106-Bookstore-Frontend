// Book types

export type BookResponse = {
  title: string;
  price: number;
  stock: number;
  rating: number;
  releaseDate: string;
  isbn: string;
  _links: {
    self: {
      href: string;
    };
    book: {
      href: string;
    };
    publisher: {
      href: string;
    };
    reviews: {
      href: string;
    };
    author: {
      href: string;
    };
  };
};

export type Book = {
  title: string;
  price: number;
  stock: number;
  rating: number;
  releaseDate: string;
  isbn: string;
};

export type BookEntry = {
  book: Book;
  url: string;
};

// Author types

export type AuthorResponse = {
  firstName: string;
  lastName: string;
  dob: string;
  _links: {
    self: {
      href: string;
    };
    author: {
      href: string;
    };
    authoredBooks: {
      href: string;
    };
  };
};

export type Author = {
  firstName: string;
  lastName: string;
  dob: string;
};

export type AuthorEntry = {
  author: Author;
  url: string;
};
