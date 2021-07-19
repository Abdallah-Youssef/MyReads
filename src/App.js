import React, { useState, useEffect } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { BookShelf } from './BookShelf'
import { getAll } from './BooksAPI'

const BooksApp = () => {
  const [showSearchPage, setshowSearchPage] = useState(false)
  const [books, setBooks] = useState([])

  useEffect(() => {

    getAll()
      .then((res) => {
        setBooks(res)
      })

  }, [])
  return (
    <div className="app">
      {
        showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => setshowSearchPage(false)}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>

                  <BookShelf
                    books={books
                      .filter((book) => book.shelf === "currentlyReading")}

                    displayName="Currently Reading"
                  />

                  <BookShelf
                    books={books
                      .filter((book) => book.shelf === "wantToRead")}

                    displayName="Want to Read"
                  />

                  <BookShelf
                    books={books
                      .filter((book) => book.shelf === "read")}

                    displayName="Read"
                  />
                </div>
              </div>
              
              <div className="open-search">
                <button onClick={() => setshowSearchPage(true)}>Add a book</button>
              </div>
            </div>
          )
      }
    </div>
  )
}


export default BooksApp


