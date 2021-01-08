import React, { Component } from 'react';
import config from '../config';
import myContext from '../Context/bookmarkContext';

const Required = () => (
    <span className='AddBookmark__required'>*</span>
  )

class EditBookmark extends Component {
    static contextType = myContext;
    static defaultProps = {
        history : {
            push : ()=>{}
        }

    }
    state = {
        error: null,
        id: '',
        title: '',
        url : '',
        description : '',
        rating: 1,
    }

    componentDidMount(){
        const bookmarkId = this.props.match.params.bookmarkId
        fetch(config.API_ENDPOINT+`/${bookmarkId}`,{
            method: 'GET',
            headers : {
                'Authorization' : config.API_KEY,
               'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => {throw error})
            }
            return res.json();
        })
        .then(responseData => {
            this.setState({
                id: responseData.id,
                title: responseData.title,
                url: responseData.url,
                description: responseData.description,
                rating: responseData.rating,
            })
        })
        .catch(e => {
            console.log(e)
        })
    }
    
    handleTitle = e => {
        this.setState({
            title : e.target.value
        })
    }

    handleUrl = e => {
        this.setState({
            url : e.target.value
        })
    }

    handleDescription = e => {
        this.setState({
            description : e.target.value
        })
    }

    handleRating = e =>{
        this.setState({
            rating : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {bookmarkId} = this.props.match.params;
        const {id, title, url, description, rating} = this.state;
        const newBookmark = {id, title, url, description, rating}
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method : 'PATCH',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${config.API_KEY}`
            },
            body : JSON.stringify(newBookmark)
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => {throw error})
            }
          //  return res.json();
        })
        .then(()=>{
            return this.context.fetchAll()})
        .then(()=>{
          this.props.history.push('/')
        })    
        .catch(e=>{
            console.log(e)
        })
    }
    handleClickeCancel = () => {
        this.props.history.push('/')
      }

    render() {
        const {title, url, description, rating, error} = this.state
        return (
            <section className='AddBookmark'>
        <h2>Edit bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              placeholder='Great website!'
              onChange={this.handleTitle}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              value={url}
              placeholder='https://www.great-website.com/'
              onChange={this.handleUrl}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleDescription}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              value={rating}
              min='1'
              max='5'
              onChange={this.handleRating}
              required

            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickeCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
        );
    }
}

export default EditBookmark;