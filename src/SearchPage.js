import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {search} from './BooksAPI'
import { BookShelf } from './BookShelf'

export const SearchPage = () => {
    const [query, setquery] = useState("")
    const [books, setbooks] = useState([])

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link  className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}

                <input 
                value={query}
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => {
                    setquery(event.target.value.trim().toLowerCase())
                    setbooks([])
                    
                    if (query.length !== 0){
                        search(query)
                        .then((ret) => {
                            console.log(ret);
                            // ret is undefined in the case of empty query
                            // ret has an error property in the case of a query outside the search terms
                            if (ret && !ret.error)
                                setbooks(ret)
                        })
                    }
                  
                }} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  <BookShelf books={books}/>
              </ol>
            </div>
          </div>
        
    )
}
