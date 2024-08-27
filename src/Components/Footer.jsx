import React from 'react'
import amazon from '../assets/asset/amazon.svg'
import paypal from '../assets/asset/paypal.png'
import google from '../assets/asset/google.svg'
import app from '../assets/asset/app.svg'
export default function Footer() {
  return (
    <footer className="bg-gray-100 ">
      <div className="container">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <h2 className="text-lg text-black sm:text-center dark:text-black">Get The FreshCart app
          </h2>
         
        </div>
          <p className="text-sm text-gray-500  dark:text-gray-400">
            We Will Send you a link, open it your phone to download the app.
          </p>
          <div className="flex gap-5 my-4">
            <input type='mail' placeholder='Email..' className=' rounded-md  w-[80%] p-2'/>
            <button className='bg-green-500 text-white px-2 py-0 rounded-sm'>Share App Link</button>
          </div>
          <div className="flex justify-between">
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <p className=" me-4 md:me-6 text-black">Payment Partners</p>
            </li>
            <li>
              <img src={amazon} className='w-[80px] px-2'/>
            </li>
            <li>
            <img src={paypal} className='w-[80px] px-2'/>
            </li>
          </ul>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <p className=" me-4 md:me-6 text-black">Get deliveries with FreshCart</p>
            </li>
            <li>
              <img src={google} className='w-[100px] px-2'/>
            </li>
            <li>
            <img src={app} className='w-[100px] px-2'/>
            </li>
          </ul>
          </div>
      </div>
    </footer>
  )
}
