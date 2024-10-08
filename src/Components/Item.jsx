import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AddtoCart } from '../Apis/CartApi'
import { addToWishlist } from '../Apis/WishlistApi'
import useMutationcart from '../Hooks/useMutationcart'
import { toast } from 'react-toastify'
import useMutationWishlist from '../Hooks/useMutationWishlist'

export default function Item({ ele, changesrc }) {
    let [flag, setFlag] = useState(false)
    let { mutate, status, data } = useMutationcart(AddtoCart)
    if (status == 'success') {
        toast(data?.data.message)

    }

    let { mutate: whish, status: wishlistStatus, data: wishlistData } = useMutationWishlist(addToWishlist)
    if (wishlistStatus == 'success') {
        toast(wishlistData?.data?.message);
    }
    return (
        <div className='md:w-1/6 sm:1/2'>
            <div className="product p-2 cursor-pointer" onClick={changesrc}>
                <Link to={`/productdetails/${ele?._id}/${ele?.category._id}`}>
                    <img src={ele?.imageCover} className='w-full'/>
                    <p className='text-green-700'>{ele?.category?.name}</p>
                    <p className='line-clamp-1'>{ele?.title}</p>
                    <div className='flex justify-between my-3'>
                        <p>{ele?.price}</p>
                        <p>{ele?.ratingsAverage} <i className='fas fa-star text-yellow-500'></i> </p>
                    </div>
                </Link>
                <i onClick={() => { setFlag(!flag); whish(ele?._id) }} className={` cursor-pointer fas ${!flag ? 'fa-heart-broken text-green-500' : 'fa-heart text-red-500'}`}></i>
                <div className="flex gap-2 items-center">
                    <button onClick={() => { mutate(ele?._id) }} className="btn bg-green-700 text-white p-2 rounded">Add to cart</button>
                    {/* <i onClick={() => { whish(ele?._id) }} className='fas fa-heart  fa-lg btn text-green-500'></i> */}
                </div>
            </div>
        </div >
    )
}