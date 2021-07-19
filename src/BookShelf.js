import React from 'react'
import {Book} from './Book'

export const BookShelf = ({ books, displayName }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{displayName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books
                        .map((book) => (
                            <li key={book.id}>
                                <Book book={book} />
                            </li>

                        ))
                    }
                </ol>
            </div>
        </div>

    )
}
