import React from "react";

export default function BookList(props) {
    function onBookPointerDown(event) {
        let dataIndex = event.currentTarget.getAttribute("data-index");

        let index = Number.parseInt(dataIndex);

        if (Number.isNaN(index)) {
            return;
        }

        if (index === props.bookIndex) {
            props.setBookIndex(bookIndex => 0);

            return;
        }

        props.setBookIndex(bookIndex => index);
    }

    return (
        <ul>
            {
                // Don't render first element in the books collection.

                // First element presents a imaginary book.

                props.books.map((book, index) => index === 0 ? null : <li className={props.bookIndex === index ? "selected" : ""} onPointerDown={onBookPointerDown} data-index={index} key={index}><span>{book.author}:</span> <span>{book.title}</span></li>)
            }
        </ul>
    )
}