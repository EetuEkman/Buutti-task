// Merges missing books from the fetched books to the book state.

function mergeBooks(bookState, fetchedBooks) {
    let ids = bookState.map(book => book.id);

    let missingBooks = fetchedBooks.filter(fetchedBook => ids.includes(fetchedBook.id) === false);

    let books = [...bookState, ...missingBooks];

    return books;
}

export default mergeBooks;