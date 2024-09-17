import React from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate,NavigationType} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import AddProduct from './Components/AddProduct'
const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <Router>
    <div> 
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route  path='/home'  element={isLoggedIn ? <Home/> : <Navigate to='/'/>}/>
          <Route  path='/add-project'  element={isLoggedIn ? <AddProduct/> : <Navigate to='/'/>}/>
        </Routes> 
    </div>
    </Router>
  )
}

export default App
