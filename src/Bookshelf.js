import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
      {this.props.bookshelfTitle && (
        <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
      )}
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    setBookshelf={this.props.setBookshelf}
                  />
                </li>
              ))}
            </ol>
          </div>
      </div>
    );
  }
}


Bookshelf.PropTypes = {
  books: PropTypes.array.isRequired,
  bookshelfTitle: PropTypes.string,
  setBookshelf: PropTypes.func.isRequired
}

export default Bookshelf;