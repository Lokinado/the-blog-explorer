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
    numberOfPosts: null,
    posts: null,
    textAreaValue: "",
    queryString: "",
    sorting: "none",
  });

  useEffect(() => {
    //I did this in order to avoid returning an promise from useEffect
    (async ()=>{
      const url = "/posts/" + appState.currentPage.toString() + 
      "?q=" + encodeURIComponent(appState.queryString) +
      "&sort=" + appState.sorting;

      const request = fetch( url ); 
      const responce = await ( await request ).json();
    
      setAppState({
        isLoading: false,
        currentPage: parseInt(responce.pageNumber),
        numberOfPages: responce.numberOfPages,
        numberOfPosts: responce.numberOfPosts,
        posts: responce.posts,
        queryString: appState.queryString,
        textAreaValue: appState.textAreaValue,
        sorting: appState.sorting
      })

    })();

  }, [appState.currentPage, appState.queryString, appState.sorting]);

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