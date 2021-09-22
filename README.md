# MyReads Project

This is a book management website.
The user can place books in three shelves : 
* Currently Reading
* Want to Read
* Read

The user can also search for books and add them to the shelves.

## TL;DR

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

# Screenshots
![Main Page](https://github.com/Abdallah-Youssef/MyReads/blob/main/screenshots/main.png?raw=true)
------------------------------
![Search Page](https://github.com/Abdallah-Youssef/MyReads/blob/main/screenshots/search.png?raw=true)
------------------------------


## Project Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── Library.js # This component contains the three shelves and the search button
    ├── Book.js # This component displays a single book from a the JSON object retrieved from the API
    ├── SearchPage.js # This page contains the search bar and the results of a query
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
    
```
