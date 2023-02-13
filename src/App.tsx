import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/App.css'

import Calculator from './components/Calculator';
import Nav from './components/Nav'

function App()  {
  return(
    <BrowserRouter>
    <Nav/>
      <Routes>
          
          <Route path="/" element={<Calculator/>}/>
          <Route path="/page" element={<Calculator/>}/>
          

      </Routes>  
    </BrowserRouter>
  )
}

export default App
