import React, { useState, useEffect } from 'react'
import { get } from './BooksAPI'

export const Book = ({ id }) => {
    const [book, setBook] = useState();

    // didMount
    useEffect(() => {
        get(id)
        .then(book => {
            setBook(book)
        });
    }, []);


    if (book)
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join(", ")}</div>
            </div>
        )
    else {
        return (
            <div className="loading"> <h2 style={{margin: 10}}>Loading ...</h2></div>
        )
    }

}
