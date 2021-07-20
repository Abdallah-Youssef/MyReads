import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll, search, update } from './BooksAPI'
import { Book } from './Book'

// "Static" variable, do not export
let query = "";



export const SearchPage = () => {
  const [books, setBooks] = useState([])
  const [libraryBooks, setlibraryBooks] = useState([])
  const [searching, setsearching] = useState(false)



  const bookChange = (book, newShelf) => {
    book.shelf = newShelf;

    // To maintain the order of the books I used map()
    setBooks(books.map(b => b.id !== book.id ? b : Object.assign({}, b, {shelf:newShelf})))
    update(book, newShelf)
  }


  const updateResults = (q) => {
    setBooks([])
    if (q === "") {
      //console.log("Empty query");
      setsearching(false)
      return
    }
    setsearching(true)

    // I have to get all the new books to get the updated shelf prop
    getAll().then(libResult => {


      // Get books currently in the library
      setlibraryBooks(libResult)


      search(q)
        .then((queryResult) => {
          // ret is undefined in the case of empty query
          // ret has an error property in the case of a query outside the search terms
          // To avoid race conditions, I have to check that the query I am retrieving
          //  is still the actual query
          if (q !== query)
            return

          if (queryResult !== undefined && !queryResult.error){
            queryResult.forEach(book => {
              // for each book in the query result
              // if it is in library, add to it the shelf prop
              let libraryBook = libraryBooks.filter(libraryBook => libraryBook.id === book.id)
              if (libraryBook.length > 0)
                  book.shelf = libraryBook[0].shelf
              
              
            })

            setBooks(queryResult)
          }

          setsearching(false)
        })

    })


  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}

          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => {
              query = event.target.value.trim().toLowerCase()
              console.log("q:" + query);
              updateResults(query)
            }} />

        </div>
      </div>
      <div className="search-books-results">

        <ol className="books-grid">
          {
            !searching ?
              books
                .map((book) => (
                  <li key={book.id}>
                    <Book book={book} bookChange={bookChange} />
                  </li>

                )) :
              <h1 className="loading-library"> Loading ...</h1>
          }
        </ol>

      </div>
    </div>

  )
}
