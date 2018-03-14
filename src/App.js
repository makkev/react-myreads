import React, { Component } from 'react';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  render() {
    return (
      <div>
        <ListBooks books={this.state.books} />
      </div>
    );
  }
}

export default BooksApp;