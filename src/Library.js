import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {BookShelf} from './BookShelf'
import {getAll} from './BooksAPI'
import './App.css'


export const Library = () => {
    const [books, setBooks] = useState([])
    const wantToReadShelfName = "wantToRead"
    const currentlyReadingShelfName = "currentlyReading"
    const readShelfName = "read"

    useEffect(() => {
  
      getAll()
        .then((res) => {
          setBooks(res)
        })
  
    }, [])
    return (
        <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>

                  <BookShelf
                    books={books
                      .filter((book) => book.shelf === currentlyReadingShelfName)}

                    displayName="Currently Reading"
                  />

                  <BookShelf
                    books={books
                      .filter((book) => book.shelf === wantToReadShelfName)}

                    displayName="Want to Read"
                  />

                  <BookShelf
                    books={books
                      .filter((book) => book.shelf === readShelfName)}

                    displayName="Read"
                  />
                </div>
              </div>
              
              <div className="open-search">

                <Link className="open-search" to = "/search">Add a book</Link>
              </div>
            </div>
          
    )
}
