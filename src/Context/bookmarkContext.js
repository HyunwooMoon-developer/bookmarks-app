import React from 'react';

const myContext = React.createContext({
    bookmarks :[],
    addBookmark : () => {},
    deleteBookmark : () => {},
    updateBookmark : () => {},
    fetchAll: () => {},
})

export default myContext;