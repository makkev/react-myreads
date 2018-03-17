import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';
// import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './BooksAPI'
// import sortBy from 'sort-by';

class Search extends Component {
  state = {
    query: '',
    showingBooks: []
  };

  updateQuery = (query) => {
    // this.searchBooks(query);
    this.setState({ query: query }, function(){
      this.searchBooks(query);
    });
  }

  searchBooks = (query) => {
    if (this.state.query) {
      BooksAPI.search(this.state.query).then((showingBooks) => {
        if (!showingBooks.error) {
          showingBooks = showingBooks.map((book) => {
            const shelfBook = this.props.books.find((foundBook) => foundBook.id === book.id);
            book.shelf = shelfBook ? shelfBook.shelf : 'none';
            return book;
          });
          this.setState({ showingBooks: showingBooks });
        } else {
          this.setState({ showingBooks: []});
        }
      });
    } else {
      this.setState({ showingBooks: []});
    }
  }

  setBookshelf = (book, bookshelf) => {
    console.log('book', book);
    console.log('bookshelf', bookshelf);
    let bookIndex = this.state.showingBooks.findIndex(x => x.id === book.id);
    let booksCopy = this.state.showingBooks;
    booksCopy[bookIndex].shelf = bookshelf;
    this.setState({ showingBooks: booksCopy});
    BooksAPI.update(book, bookshelf);
  }


  render() {
    // console.log('----');
    // console.log('query', this.state.query);
    // console.log('showingbooks', this.state.showingBooks);
    console.log(this.props.history);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" onClick={this.forceUpdate} to="/">Close</Link>
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
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {this.state && this.state.showingBooks && 
          <div className="search-books-results">
            <Bookshelf 
              books={this.state.showingBooks}
              setBookshelf={this.setBookshelf}
            />
          </div>
        }
      </div>
    );
  }
}


Search.PropTypes = {
  books: PropTypes.array.isRequired,
}

export default Search;