import React, { useContext, useState } from 'react'
import logo from '../assets/asset/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/AuthContext'
import { getCart } from '../Apis/CartApi';
import useQuerycart from '../Hooks/useQuerycart';
export default function Navbar() {
  let { isError, error, data, isLoading } = useQuerycart('getcart', getCart);
  let navigate = useNavigate()
  let { setLogin, isLogin } = useContext(auth)
  let [open, setOpen] = useState(false)
  function toggle() {
    setOpen(!open)
  }
  function logout(params) {
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/login')
  }
  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button onClick={toggle} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5" />
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex px-8 items-center justify-center sm:items-stretch md:justify-start ">
            <div className="flex items-center">
              <img className="h-8 w-auto" src={logo} />
            </div>
            {isLogin ? <div className="hidden sm:ml-6 lg:block">
              <div className="flex space-x-4">
                <NavLink to='/' className="rounded-md  px-2 py-2 text-lg font-normal text-gray-500 hover:text-black" aria-current="page">Home</NavLink>
                <NavLink to='/products' className="rounded-md  px-2 py-2 text-lg font-normal text-gray-500 hover:text-black" >Products</NavLink>
                <NavLink to='/cart' className="rounded-md px-2 py-2 text-lg font-normal text-gray-500 hover:text-black ">Cart</NavLink>
                <NavLink to='/categories' className="rounded-md px-2 py-2 text-lg font-normal text-gray-500 hover:text-black ">Categories</NavLink>
                <NavLink to='/brand' className="rounded-md px-2 py-2 text-lg font-normal text-gray-500 hover:text-black ">Brands</NavLink>
              </div>
            </div> : ''}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-5">

            {isLogin ?
              <>
                <li className='fas fa-cart-shopping text-green-600'>
                  <span className=' text-black absolute top-[10px]'>{data?.numOfCartItems}</span>
                </li>
                <li className="list-none text-gray-500"> {isLogin ? <p>Hi <span className="text-green-700">{isLogin.name}</span> </p> : ''}</li>
                <li onClick={logout} className=" cursor-pointer px-3 text-lg font-normal text-gray-500 list-none ">LogOut  </li>
              </> :
              <>
                <div className='social-icon'>
                  <i className='fab fa-instagram px-1'></i>
                  <i className='fab fa-facebook px-1 '></i>
                  <i className='fab fa-tiktok px-1 '></i>
                  <i className='fab fa-twitter px-1 '></i>
                  <i className='fab fa-linkedin px-1 '></i>
                  <i className='fab fa-youtube px-1 '></i>
                </div>
                <NavLink to='/login' className="px-3 text-lg font-normal text-gray-500">Login</NavLink>
                <NavLink to='/register' className="px-3 text-lg font-normal text-gray-500">Register</NavLink>
              </>}
          </div>
        </div>
      </div>
      <div className={`md:hidden ${open ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink to='/' className="block rounded-md  px-2 py-2 text-base font-medium text-gray-500 hover:text-black" aria-current="page">Home</NavLink>
          <NavLink to='/products' className=" block rounded-md  px-2 py-2 text-base font-medium text-gray-500 hover:text-black" >Products</NavLink>
          <NavLink to='/cart' className="block rounded-md px-2 py-2 text-base font-medium text-gray-500 hover:text-black ">Cart</NavLink>
          <NavLink to='/categories' className="block rounded-md px-2 py-2 text-base font-medium text-gray-500 hover:text-black ">Categories</NavLink>
          <NavLink to='/brand' className="block rounded-md px-2 py-2 text-base font-medium text-gray-500 hover:text-black ">Brands</NavLink>
        </div>
      </div>
    </nav>
  )
}
