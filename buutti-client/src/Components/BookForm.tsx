import React from "react";
import Book from "../Models/Book";

interface Props {
    books: Book[];
    bookIndex: number;
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export default function BookForm(props: Props) {
    function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.currentTarget.value;

        let newBooks = [...props.books];

        newBooks[props.bookIndex].title = value;

        props.setBooks(books => newBooks);
    }

    function onAuthorChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.currentTarget.value;

        let newBooks = [...props.books];

        newBooks[props.bookIndex].author = value;

        props.setBooks(books => newBooks);
    }

    function onDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let value = event.currentTarget.value;

        let newBooks = [...props.books];

        newBooks[props.bookIndex].description = value;

        props.setBooks(books => newBooks);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label>
                <span>Title</span>
                <input onChange={onTitleChange} value={props.books[props.bookIndex].title} type="text"></input>
            </label>
            <label>
                <span>Author</span>
                <input onChange={onAuthorChange} value={props.books[props.bookIndex].author} type="text"></input>
            </label>
            <label>
                <span>Description</span>
                <textarea onChange={onDescriptionChange} value={props.books[props.bookIndex].description}></textarea>
            </label>
        </form>
    )
}