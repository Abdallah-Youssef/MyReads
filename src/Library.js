import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Book } from './Book'
import { getAll, update } from './BooksAPI'
import './App.css'


export const Library = () => {
  const [books, setBooks] = useState([])
  const wantToReadShelfName = "wantToRead"
  const currentlyReadingShelfName = "currentlyReading"
  const readShelfName = "read"

  const getBooks = () => {
    getAll()
      .then((res) => {
        console.log(res);
        setBooks(res)
      })
  }

  useEffect(() => {
    getBooks()
  }, [])

  const bookChange = (book, newShelf) => {
    console.log(book, newShelf);
    update(book, newShelf).then(() => {
      setBooks([])
      getBooks()
    })
  }


  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>


      { books.length ? (
        <div className="list-books-content">
          <div>
            {/* Currently Reading */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">

                <ol className="books-grid">
                  {
                    books
                      .filter((book) => book.shelf === currentlyReadingShelfName)
                      .map((book) => (
                        <li key={book.id}>
                          <Book book={book} bookChange={bookChange} />
                        </li>

                      ))
                  }
                </ol>
              </div>
            </div>

            {/* Want to Read */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">

                <ol className="books-grid">
                  {
                    books
                      .filter((book) => book.shelf === wantToReadShelfName)
                      .map((book) => (
                        <li key={book.id}>
                          <Book book={book} bookChange={bookChange} />
                        </li>

                      ))
                  }
                </ol>
              </div>
            </div>

            {/* Read */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">

                <ol className="books-grid">
                  {
                    books
                      .filter((book) => book.shelf === readShelfName)
                      .map((book) => (
                        <li key={book.id}>
                          <Book book={book} bookChange={bookChange} />
                        </li>

                      ))
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
      ) : (<h1 className="loading-library"> Loading</h1>)}


      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
          </Link>
      </div>
    </div>

  )
}
