import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Library } from './Library'
import { SearchPage } from './SearchPage'
import { Switch, Route } from 'react-router-dom'

const BooksApp = () => {

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Library />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
      </Switch>
    </div>
  )
}


export default BooksApp


