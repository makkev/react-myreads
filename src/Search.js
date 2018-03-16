import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.setShowSearchPage(false)}>Close</a>
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
        <div className="search-books-results">
          {JSON.stringify(this.state)}
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}


Search.PropTypes = {
  books: PropTypes.array.isRequired,
  setShowSearchPage: PropTypes.func.isRequired
}

export default Search;