import React from 'react'

export const Book = ({ book }) => {
    let image = book.imageLinks ?
     `url(${book.imageLinks.thumbnail})` :
     "url(/generic-book-cover.jpg)"
    if (book)
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: image
                        }}>

                    </div>

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
                <div className="book-authors">{book.authors ? book.authors.join(", ") : "No Authors"}</div>
            </div>
        )
    else {
        return (
            <div className="loading"> <h2 style={{ margin: 10 }}>Loading ...</h2></div>
        )
    }

}
