import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import myContext from '../Context/bookmarkContext';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';



export default class BookmarkItem extends React.Component {
  static defaultProps = {
    history: {
      push: () =>{}
    }
  };
  static contextType = myContext;

  handleClickedDelete =(bookmarkId) =>{
  
    fetch(config.API_ENDPOINT+`/${bookmarkId}`,{
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
    //  return res.json()
    })
    .then(()=> {
     return this.context.fetchAll();
    })
    .then(()=>{
     return this.props.history.push('/');
    })
    .catch(e=>{
      console.log(e);
    })
  }
 
  render(){
  return ( 
    
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={this.props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {this.props.title}
          </a>
        </h3>
        <Rating value={this.props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {this.props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <Link to={`/edit/${this.props.id}`}>
          <button className='BookmarkItem__description'>
            Edit
          </button>
        </Link>
        <button
          className='BookmarkItem__description'
          onClick={()=> this.handleClickedDelete(this.props.id)}
        >
          Delete
        </button>
      </div>
    </li>
    
  )}
  
}

