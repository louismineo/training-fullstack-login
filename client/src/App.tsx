
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './components/mainPage';
import { AddEditPage } from './components/addEditPage';

import { uiActions,userStates } from './store/uiSlice'
import { useEffect } from "react"
import { useAppDispatch } from './store/hooks'


function App() {

//{console.log("App is running")}

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  //console.log(`Updated Width: ${width}, Updated Height: ${height}`);
});

const dispatch = useAppDispatch();

//effect to handle screen resize
useEffect(()=>
  {
      const handleResize = () =>
      {
          dispatch(uiActions.updateIsDesktop((window.innerWidth >= 768)));

          dispatch(uiActions.updateIsWidescreen(((window.innerWidth / window.innerHeight) >= (2.1))));
      }

      // to let it run on mount
      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize)
  },[dispatch])


return(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<MainPage/>}/>
      <Route path = "/addEdit" element = {<AddEditPage/>}/>
      <Route path = "/addEdit/:uuid" element = {<AddEditPage/>}/>
    </Routes>
  </BrowserRouter>
)
}


/*
function App() {
    return (
    <>
      <MainPage/>
    </>
  )
}

*/
export default App
