import React, { useState, useEffect } from 'react';
import MainAppbar from './Components/MainAppbar';
import ContentPanel from './Components/ContentPanel';
import './App.css';

export const AppStateContext = React.createContext( null );

function App() {

  const [appState, setAppState] = useState( {
    isLoading: true,
    currentPage: 0,
    numberOfPages: null,
    posts: null,
  });

  useEffect(() => {
    //I did this in order to avoid returning an promise from useEffect
    (async ()=>{
      const request = fetch("/posts/0"); 
      const responce = await ( await request ).json();
    
      setAppState({
        isLoading: false,
        currentPage: responce.pageNumber,
        numberOfPages: responce.numberOfPages,
        posts: responce.posts,
      })  
    })();
  }, []);

  return (
    <div className='page-container'>
      <AppStateContext.Provider value={{appState: appState, setAppState: setAppState}}>
        <MainAppbar/>
        <ContentPanel/>
      </AppStateContext.Provider>
    </div>
  );
}

export default App; 