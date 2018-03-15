import React, { Component } from 'react';
import ListBooks from './ListBooks';
import Search from './Search'
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends Component {

  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  setShowSearchPage = (showPage) => {
    this.setState({ showSearchPage: showPage })
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  setBookShelf = (book, bookshelf) => {
    BooksAPI.update(book, bookshelf).then(() => {
      this.componentDidMount();
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search setShowSearchPage={this.setShowSearchPage} />
        ) : (
          <ListBooks 
            books={this.state.books} 
            setShowSearchPage={this.setShowSearchPage} 
            setBookshelf={this.setBookShelf}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;