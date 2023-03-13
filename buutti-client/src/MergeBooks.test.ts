import mergeBooks from "./MergeBooks";
import Book from "./Models/Book";

let bookState: Book[] = [
    {
        id: null,
        author: "",
        title: "",
        description: ""
    },
    {
        id: 23,
        author: "Jack Nicholson",
        title: "Doom opera",
        description: "Great throat singing."
    },
    {
        id: 6,
        author: "Street Lightning",
        title: "Got to go fast",
        description: "Greased pig."
    },
];

let fetchedBooks: Book[] = [
    {
        id: 3,
        author: "Crocodile",
        title: "Rocks",
        description: "Amphibians."
    },
    {
        id: 33,
        author: "Mel Rose",
        title: "Place",
        description: "Beverly Hills."
    },
    {
        id: 22,
        author: "Happy go lucky",
        title: "His loyal friends",
        description: "Bristling adventure."
    },
];

test("Merges arrays with different book ids.", () => {
    expect(mergeBooks(bookState, fetchedBooks)).toContainEqual({
        id: null,
        author: "",
        title: "",
        description: ""
    });

    expect(mergeBooks(bookState, fetchedBooks)).toContainEqual({
        id: 23,
        author: "Jack Nicholson",
        title: "Doom opera",
        description: "Great throat singing."
    });

    expect(mergeBooks(bookState, fetchedBooks)).toContainEqual({
        id: 6,
        author: "Street Lightning",
        title: "Got to go fast",
        description: "Greased pig."
    });

    expect(mergeBooks(bookState, fetchedBooks)).toContainEqual({
        id: 3,
        author: "Crocodile",
        title: "Rocks",
        description: "Amphibians."
    });

    expect(mergeBooks(bookState, fetchedBooks)).toContainEqual({
        id: 33,
        author: "Mel Rose",
        title: "Place",
        description: "Beverly Hills."
    });

    expect(mergeBooks(bookState, fetchedBooks)).toContainEqual({
        id: 22,
        author: "Happy go lucky",
        title: "His loyal friends",
        description: "Bristling adventure."
    });
});

let secondBookState: Book[] = [
    {
        id: null,
        author: "",
        title: "",
        description: ""
    },
    {
        id: 23,
        author: "Jack Nicholson",
        title: "Doom opera",
        description: "Great throat singing."
    }
];

let secondFetchedBooks: Book[] = [
    {
        id: 23,
        author: "Crocodile",
        title: "Rocks",
        description: "Amphibians."
    },
    {
        id: 59,
        author: "Hanoi Rocks",
        title: "Memoirs",
        description: "Rock'n'roll"
    }
];

test("Fetched books won't overwrite local books", () => {
    expect(mergeBooks(secondBookState, secondFetchedBooks)).toContainEqual({
        id: 23,
        author: "Jack Nicholson",
        title: "Doom opera",
        description: "Great throat singing."
    });

    expect(mergeBooks(secondBookState, secondFetchedBooks)).toContainEqual({
        id: 59,
        author: "Hanoi Rocks",
        title: "Memoirs",
        description: "Rock'n'roll"
    });
});