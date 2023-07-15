import React, { useState, useEffect, useMemo } from 'react';
import MainAppbar from './Components/MainAppbar';
import ContentPanel from './Components/ContentPanel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import './App.css';

export const AppStateContext = React.createContext( null );

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [appState, setAppState] = useState( {
    isLoading: true,
    currentPage: 0,
    numberOfPages: null,
    numberOfPosts: null,
    posts: null,
    textAreaValue: "",
    queryString: "",
    sorting: "none",
    colorMode: prefersDarkMode
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
        sorting: appState.sorting,
        colorMode: appState.colorMode
      })

    })();

  }, [appState.currentPage, appState.queryString, appState.sorting]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: appState.colorMode ? 'dark' : 'light',
          postBackground: appState.colorMode ? '#272727' : '#eeeeee'
        },
      }),
    [appState.colorMode],
  );

  return (
    <div className='page-container'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppStateContext.Provider value={{appState: appState, setAppState: setAppState}}>
          <MainAppbar/>
          <ContentPanel/>
        </AppStateContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App; 