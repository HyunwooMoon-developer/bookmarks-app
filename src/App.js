/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import myContext from './Context/bookmarkContext';
import { Route } from 'react-router-dom';
import EditBookmark from './EditBookmark/EditBookmark';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    bookmarks : [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
   this.setState({
     bookmarks : this.state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
   }) 
  }

  updateBookmark = updateBookmark => {
    const newBookmark = this.state.bookmarks.map(bookmark=>
      (bookmark.id === updateBookmark.id)
                    ? updateBookmark
                    : bookmark
      )
      this.setState({
        bookmarks : newBookmark,
      })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValues = {
      bookmarks : this.state.bookmarks,
      addBookmark : this.addBookmark,
      deleteBookmark : this.deleteBookmark,
      updateBookmark : this.updateBookmark,
    }
    return (
      <main className='App'>
        <myContext.Provider value={contextValues}>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route exact path='/' component={BookmarkList} />
          <Route path='/add-bookmark' component={AddBookmark} />
          <Route path='/edit/:bookmarkId' component={EditBookmark} />
        </div>
        </myContext.Provider>
      </main>
    );
  }
}

export default App;
