import React from 'react'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { Route, Routes } from 'react-router-dom'
import MyAds from './Components/MyAds/MyAds'
import EditProduct from './Components/Edit/EditProduct'

const App = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create_post' element={<Create/>}/>
          <Route path='/view_post' element={<ViewPost/>}/>
          <Route path="/my-ads" element={<MyAds/>} />
          <Route path="/edit-product/:id" element={<EditProduct />} />

        </Routes>
      
    </>
  )
}

export default App