import React, { useEffect, useState } from "react";

// import React, { Component } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import AppRoutes from './AppRoutes';
// import { Layout } from './components/Layout';

import './custom.css';

export default function App() {
    const [books, setBooks] = useState([]);

    const [selectedBook, setSelectedBook] = useState(-1);

    const [isWorking, setIsWorking] = useState(false);

    const [title, setTitle] = useState("");

    const [author, setAuthor] = useState("");

    const [description, setDescription] = useState("");

    function onTitleChange(event) {
        let value = event.currentTarget.value;

        setTitle(title => value);
    }

    function onAuthorChange(event) {
        let value = event.currentTarget.value;

        setAuthor(author => value);
    }

    function onDescriptionChange(event) {
        let value = event.currentTarget.value;

        setDescription(description => value);
    }

    async function getBooks() {
        if (isWorking) {
            return;
        }

        setIsWorking(isWorking => true);

        let response = await fetch("https://localhost:7134/api/Book");

        console.log(JSON.stringify(response, null, 2));

        let json = await response.json();

        console.log(JSON.stringify(json, null, 2));

        setBooks(books => json);

        setIsWorking(isWorking => false);
    }

    async function saveBook() {
        if (isWorking) {
            return;
        }

        setIsWorking(isWorking => true);


        let book = {
            "author": author,
            "title": title,
            "description": description
        }

        let response = await fetch("https://localhost:7134/api/Book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });

        setAuthor(author => "");
        setTitle(title => "");
        setDescription(description => "");

        await getBooks();

        setIsWorking(isWorking => false);
    }

    function onSavePointerDown(event) {
        saveBook();
    }

    function OnFetchPointerDown(event) {
        getBooks();
    }

    useEffect(() => {
        getBooks();
    }, [])

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    <span>Title</span>
                    <input onChange={onTitleChange} value={title} type="text"></input>
                </label>
                <label>
                    <span>Author</span>
                    
                    <input onChange={onAuthorChange} value={author} type="text"></input>
                </label>
                <label>
                    <span>Description</span>
                    
                    <input onChange={onDescriptionChange} value={description} type="text"></input>
                </label>
                <div>
                    <button onPointerDown={OnFetchPointerDown}>Fetch</button>
                    <button onPointerDown={onSavePointerDown}>Save new</button>
                    <button>Save</button>
                    <button>Delete</button>
                </div>
            </form>
            <textarea>
            </textarea>
            {
                isWorking ?
                    <div>Working ..</div>
                    :
                    null
            }
            <ul>
                {

                    books.length > 0 ?
                        books.map((book, index) => <li data-id={book.id} key={index}>{book.author}: {book.title}</li>)
                        :
                        <li>No books</li>
                }
            </ul>
        </div>
    )
}

/*

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
}

*/
