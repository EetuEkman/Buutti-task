import React, { useEffect, useState } from "react";
import mergeBooks from "./MergeBooks";
import './custom.css';

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

    function onTitleChange(event) {
        let value = event.currentTarget.value;

        let newBooks = [...books];

        newBooks[bookIndex].title = value;

        setBooks(books => newBooks);
    }

    function onAuthorChange(event) {
        let value = event.currentTarget.value;

        let newBooks = [...books];

        newBooks[bookIndex].author = value;

        setBooks(books => newBooks);
    }

    function onDescriptionChange(event) {
        let value = event.currentTarget.value;

        let newBooks = [...books];

        newBooks[bookIndex].description = value;

        setBooks(books => newBooks);
    }

    async function getBooks() {
        if (isWorking) {
            return;
        }

        setIsWorking(isWorking => true);

        let response = await fetch(URLS.FetchBooks);

        let fetchedBooks = await response.json();

        let newBooks = mergeBooks(books, fetchedBooks);

        setBooks(books => newBooks);

        setIsWorking(isWorking => false);
    }

    // Builds a new book object without id, serializes the object
    // and sends it to API in HTTP POST body.

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

        let response = await fetch(URLS.SaveBook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });

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

        let response = await fetch(URLS.UpdateBook, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });

        setIsWorking(isWorking => false);
    }

    async function deleteBook() {
        // Prevent deleting the imaginary book at index 0.

        if (bookIndex === 0) {
            return;
        }

        let id = books[bookIndex].id;

        let response = await fetch(URLS.DeleteBook + id, {
            method: "DELETE",
        });

        // Remove the book at index.

        let newBooks = [...books];

        newBooks.splice(bookIndex, 1);

        newBooks[0].title = "";
        newBooks[0].author = "";
        newBooks[0].description = "";

        setBooks(books => newBooks);

        setBookIndex(index => 0);
    }

    function onSavePointerDown(event) {
        saveBook();
    }

    function onBookPointerDown(event) {
        let dataIndex = event.currentTarget.getAttribute("data-index");

        let index = Number.parseInt(dataIndex);

        if (Number.isNaN(index)) {
            return;
        }

        if (index === bookIndex) {
            setBookIndex(bookIndex => 0);

            return;
        }

        setBookIndex(bookIndex => index);
    }

    function onUpdatePointerDown(event) {
        updateBook();
    }

    function onDeletePointerDown(event) {
        deleteBook();
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
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    <span>Title</span>
                    <input onChange={onTitleChange} value={books[bookIndex].title} type="text"></input>
                </label>
                <label>
                    <span>Author</span>

                    <input onChange={onAuthorChange} value={books[bookIndex].author} type="text"></input>
                </label>
                <label>
                    <span>Description</span>
                    
                    <textarea onChange={onDescriptionChange} value={books[bookIndex].description} type="text"></textarea>
                </label>
                <div>
                    <button onPointerDown={onSavePointerDown}>Save new</button>
                    <button onPointerDown={onUpdatePointerDown}>Save</button>
                    <button onPointerDown={onDeletePointerDown}>Delete</button>
                </div>
            </form>
            {
                error.length > 0 ?
                    <div>{error}</div>
                    :
                    null
            }
            {
                isWorking ?
                    <div>Working ..</div>
                    :
                    null
            }
            <ul>
                {
                    // Don't render first element in the books collection

                    // First element presents a unselected book.

                    books.map((book, index) => index === 0 ? null : <li className={bookIndex === index ? "selected" : ""} onPointerDown={onBookPointerDown} data-index={index} key={index}>{book.author}: {book.title}</li>)
                }
            </ul>
        </div>
    )
}