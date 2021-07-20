import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll, search, update } from './BooksAPI'
import { Book } from './Book'

// "Static" variable, do not export
let query="";



export const SearchPage = () => {
  const [books, setBooks] = useState([])
  const [libraryBooks, setlibraryBooks] = useState([])
  const [searching, setsearching] = useState(false)



  const bookChange = (book, newShelf) => {
    update(book, newShelf)
      .then(() => updateResults(query))
  }

  const shelfDisplayName = (shelfName) => {
    switch (shelfName) {
      case "currentlyReading":
        return "Currently Reading"

      case "wantToRead":
        return "Want to Read"

      case "read":
        return "Read"
    }
  }

  const updateResults = (q) => {
    setBooks([])
    if (q === ""){
      console.log("Empty query");
      setsearching(false)
      return
    }
    setsearching(true)

    // I have to get all the new books to get the updated shelf prop
    getAll().then(ret => {


      // Get books currently in the library
      setlibraryBooks(ret)


      search(q)
        .then((ret) => {
          // ret is undefined in the case of empty query
          // ret has an error property in the case of a query outside the search terms
          // To avoid race conditions, I have to check that the query I am retrieving
          //  is still the actual query
          if (q !== query)
            return

          if (ret !== undefined && !ret.error) 
            setBooks(ret)
          
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

                    {
                      // If this books is in library
                      libraryBooks.some(libraryBook => libraryBook.id === book.id)
                      &&
                      <div className="shelf">  Shelf: {
                        shelfDisplayName(libraryBooks.find(libraryBook => libraryBook.id === book.id).shelf)
                      } </div>
                    }

                  </li>

                )) :
              <h1 className="loading-library"> Loading ...</h1>
          }
        </ol>

      </div>
    </div>

  )
}
