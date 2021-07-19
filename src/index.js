import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import {getAll} from './BooksAPI'

getAll().then((ret) => console.log(ret))

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
, document.getElementById('root'))
