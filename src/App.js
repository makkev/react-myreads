import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search'
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends Component {

  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  setBookShelf = (book, bookshelf) => {
    let bookIndex = this.state.books.findIndex(x => x.id === book.id);
    let booksCopy = [...this.state.books];
    booksCopy[bookIndex].shelf = bookshelf;
    BooksAPI.update(book, bookshelf).then(() => {
      this.setState({ books: booksCopy})
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks 
            books={this.state.books} 
            setBookshelf={this.setBookShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <Search 
            books={this.state.books} 
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;