import React from 'react'
import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import AddProduct from './Components/AddProduct'
import Preview from './Components/Preview'
import About from './Components/About'
const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<Login/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route  path='/home'  element={isLoggedIn ? <Home/> : <Navigate to='/'/>}/>
          <Route  path='/add-project'  element={isLoggedIn ? <AddProduct/> : <Navigate to='/'/>}/>
          <Route  path='/preview'  element={isLoggedIn ? <Preview/> : <Navigate to='/'/>}/>
          <Route  path='/about'  element={isLoggedIn ? <About/> : <Navigate to='/'/>}/>
        </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
