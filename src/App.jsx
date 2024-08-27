import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Products from './Components/Products'
import Cart from './Components/Cart'
import Notfound from './Components/Notfound'
import Brand from './Components/Brand'
import ProtectedRoute from './Components/ProtectedRoute'
import Forget from './Components/Forget'
import Resetcode from './Components/Resetcode'
import Newpass from './Components/Newpass'
import Productdetails from './Components/Productdetails'
import Categories from './Components/Categories'
import Wishlist from './Components/Whishlist'
import Allorders from './Components/Allorders'
function App() {
  let routes = createBrowserRouter([{
    path:'/',element:<Layout></Layout>,children:[
      {index:true,element:<ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'/login',element:<Login></Login>},
      {path:'/forget',element:<Forget></Forget>},
      {path:'/resetcode',element:<Resetcode></Resetcode>},
      {path:'/newpass',element:<Newpass></Newpass>},
      {path:'/register',element:<Register></Register>},
      {path:'E-commerceApp/allorders',element:<Allorders></Allorders>},
      {path:'/wishlist',element:<Wishlist></Wishlist>},
      {path:'/products',element:<ProtectedRoute><Products></Products></ProtectedRoute>},
      {path:'/productdetails/:id/:categoryId',element:<ProtectedRoute><Productdetails></Productdetails></ProtectedRoute>},
      {path:'/cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'/brand',element:<ProtectedRoute><Brand></Brand></ProtectedRoute>},
      {path:'/categories',element:<ProtectedRoute><Categories></Categories></ProtectedRoute>},
      {path:'*',element:<Notfound></Notfound>},
    ],
  }])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
