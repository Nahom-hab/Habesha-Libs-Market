import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './pages/search'
import Product from './pages/product'
import Home from './pages/home'
import ProtectedRoute from './components/protectedRoute'
import EditProducts from './pages/admin/editProducts'
import AddProduct from './pages/admin/AddProduct'
import EditElements from './pages/admin/EditElements'
import Login from './pages/admin/Login'
import './App.css'
import AllProducts from './pages/AllProducts'
import AdminHome from './pages/admin/AdminHome'
import About from './pages/About'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/product/:id' element={<Product />}></Route>
        <Route path='/products' element={<AllProducts />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/addproduct' element={<AddProduct />}></Route>
          <Route path='/admin' element={<AdminHome />}></Route>
          <Route path='/editproduct/:id' element={<EditProducts />}></Route>
          <Route path='/editElements' element={<EditElements />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
