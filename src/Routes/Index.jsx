import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/login'
import Signup from '../Pages/signup'

const Index = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
    </Routes>
  )
}

export default Index