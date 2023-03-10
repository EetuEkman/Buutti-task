import React, { useEffect, useState } from "react";
import mergeBooks from "./MergeBooks";
import './custom.css';
import BookForm from "./components/BookForm";
import BookButtons from "./components/BookButtons";
import BookList from "./components/BookList";
import ErrorDisplay from "./components/ErrorDisplay";
import FETCH_ERRORS from "./Constants/FetchErrors";

// Project uses Create React App, store the API base url in .env file.

const API_URL = process.env.REACT_APP_API_URL;

const URLS = {
    "FetchBooks": API_URL + "Book",
    "SaveBook": API_URL + "Book",
    "UpdateBook": API_URL + "Book",
    "DeleteBook": API_URL + "Book/",
}

const SESSION_STORAGE_KEYS = {
    "Books": "Buutti-tasks/v1/Books"
}

const DEFAULT_BOOK = {
    id: null,
    author: "",
    title: "",
    description: ""
}

const DEFAULT_BOOKS = [
    DEFAULT_BOOK
];

function getStoredBooks() {
    let storedBooks = sessionStorage.getItem(SESSION_STORAGE_KEYS.Books);

    if (storedBooks) {
        return JSON.parse(storedBooks);
    }

    return DEFAULT_BOOKS;
}

export default function App() {
    // Holds the local books state which combines with
    // and overrides the global state fetched from the API.

    // Index 0 holds imaginary book to hold the book state when no book is selected.

    const [books, setBooks] = useState(getStoredBooks());

    // Index pointing to the selected book.

    const [bookIndex, setBookIndex] = useState(0);

    // Ongoing asynchronous actions.

    const [isWorking, setIsWorking] = useState(false);

    const [error, setError] = useState("");

    async function getBooks() {
        if (isWorking) {
            return;
        }

        setIsWorking(isWorking => true);

        try {
            let response = await fetch(URLS.FetchBooks);

            if (!response.ok) {
                setError(error => response.statusText);
            }

            let fetchedBooks = await response.json();

            let newBooks = mergeBooks(books, fetchedBooks);

            setBooks(books => newBooks);
        }
        catch (exception) {
            setError(error => FETCH_ERRORS.NetworkError);

            setIsWorking(isWorking => false);

            return;
        }

        setIsWorking(isWorking => false);
    }

    // Builds a new book object without an id, serializes the object
    // and sends it to the API in a HTTP POST body.

    async function saveBook() {
        if (isWorking) {
            return;
        }

        setIsWorking(isWorking => true);

        setError(error => "");

        if (books[bookIndex].title.length === 0) {
            setError(error => "Title is required.");

            setIsWorking(isWorking => false);

            return;
        }

        if (books[bookIndex].author.length === 0)  {

            setError(error => "Author is required.");

            setIsWorking(isWorking => false);

            return;
        }

        let book = {
            author: books[bookIndex].author,
            title: books[bookIndex].title,
            description: books[bookIndex].description
        };

        try {
            let response = await fetch(URLS.SaveBook, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })

            if (!response.ok) {
                setError(error => response.statusText);
            }
        }
        catch (exception) {
            setError(error => FETCH_ERRORS.NetworkError);

            setIsWorking(isWorking => false);

            return;
        }

        if (bookIndex === 0) {
            let newBooks = [...books];

            newBooks[bookIndex].title = "";
            newBooks[bookIndex].author = "";
            newBooks[bookIndex].description = "";

            setBooks(books => newBooks);
        }

        setIsWorking(isWorking => false);

        await getBooks();
    }

    async function updateBook() {
        if (isWorking) {
            return;
        }

        // Prevent updating the imaginary book in index 0.

        // The book only exists in local state.

        if (bookIndex === 0) {
            return;
        }

        setIsWorking(isWorking => true);

        setError(error => "");

        if (books[bookIndex].title.length === 0) {
            setError(error => "Title is required.");

            setIsWorking(isWorking => false);

            return;
        }

        if (books[bookIndex].author.length === 0) {

            setError(error => "Author is required.");

            setIsWorking(isWorking => false);

            return;
        }

        let book = { ...books[bookIndex] };

        try {
            let response = await fetch(URLS.UpdateBook, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                setError(error => response.statusText);
            }
        }
        catch (exception) {
            setError(error => FETCH_ERRORS.NetworkError);

            setIsWorking(isWorking => false);

            return;
        }

        setIsWorking(isWorking => false);
    }

    async function deleteBook() {
        // Prevent deleting the imaginary book at index 0.

        if (bookIndex === 0) {
            return;
        }

        let id = books[bookIndex].id;

        try {
            let response = await fetch(URLS.DeleteBook + id, {
                method: "DELETE",
            });

            if (!response.ok) {
                setError(error => response.statusText);
            }
        }
        catch (exception) {
            setError(error => FETCH_ERRORS.NetworkError);

            setIsWorking(isWorking => false);

            return;
        }

        // Remove the book at index.

        let newBooks = [...books];

        newBooks.splice(bookIndex, 1);

        newBooks[0].title = "";
        newBooks[0].author = "";
        newBooks[0].description = "";

        setBooks(books => newBooks);

        setBookIndex(index => 0);
    }

    async function setStoredBooks() {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.Books, JSON.stringify(books));
    }

    // Fetch books on load.

    useEffect(() => {
        getBooks();
    }, [])

    // Persist the books between page reloads.

    useEffect(() => {
        setStoredBooks();
    }, [books])

    return (
        <div className="app">
            <div>
                <BookForm books={books} setBooks={setBooks} bookIndex={bookIndex}></BookForm>
                <BookButtons saveBook={saveBook} updateBook={updateBook} deleteBook={deleteBook} isWorking={isWorking}></BookButtons>
            </div>
            <div>
                <BookList books={books} bookIndex={bookIndex} setBookIndex={setBookIndex}></BookList>
                <ErrorDisplay error={error}></ErrorDisplay>
                {
                    isWorking ?
                        <div>Working ..</div>
                        :
                        null
                }
            </div>
        </div>
    )
}