// Merges missing books from the fetched books to the book state.

import Book from "./Models/Book";

function mergeBooks(bookState: Book[], fetchedBooks: Book[]): Book[] {
    let ids = bookState.map(book => book.id);

    let missingBooks = fetchedBooks.filter(fetchedBook => ids.includes(fetchedBook.id) === false);

    let books = [...bookState, ...missingBooks];

    return books;
}

export default mergeBooks;