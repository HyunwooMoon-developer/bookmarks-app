import React from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import myContext from '../Context/bookmarkContext';
import history from '../history';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';

function handleClickedDelete(bookmarkId){

  fetch(config.API_ENDPOINT+`/${bookmarkId}`,{
    method: 'DELETE',
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
  .then(()=> {
    this.context.deleteBookmark(bookmarkId);
    history.push('/');
  })
  .catch(e=>{
    console.log(e);
  })
}


export default function BookmarkItem(props) {
  return ( 
    <myContext.Consumer>
    {(context) =>
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <Link to={`/edit/${props.id}`}>
          <button className='BookmarkItem__description'>
            Edit
          </button>
        </Link>
        <button
          className='BookmarkItem__description'
          onClick={()=> handleClickedDelete(props.id, context.deleteBookmark)}
        >
          Delete
        </button>
      </div>
    </li>}
    </myContext.Consumer>
  )
  
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}
