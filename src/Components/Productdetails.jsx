import React, { useEffect, useState } from 'react'
import { getproductDetails } from '../Apis/getproductDetails'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRelatedProduct } from '../Apis/getProducts'
import Item from './Item'
import Loading from './Loading';
import { AddtoCart } from '../Apis/CartApi';
import useMutationcart from '../Hooks/useMutationcart';
import { toast } from 'react-toastify';
import useMutationWishlist from '../Hooks/useMutationWishlist';
import { addToWishlist } from '../Apis/WishlistApi';
export default function Productdetails() {
  let { mutate, status, data } = useMutationcart(AddtoCart)
  if (status == 'success')
    toast(data?.data.message)
  if (status == 'error')
    console.log('error');

  let { mutate: whish, status: wishlistStatus, data: wishlistData } = useMutationWishlist(addToWishlist)
  if (wishlistStatus == 'success') {
    toast(wishlistData?.data?.message);
  }
  let [products, setProducts] = useState([])
  let [relatedproducts, setRelatedproducts] = useState([])
  let [loading, setLoading] = useState(false)
  let [message, setMessage] = useState('')
  let [imghover, setImagehover] = useState('')
  let { id, categoryId } = useParams()
  async function getproductDetailsApi() {
    setLoading(true)
    let data = await getproductDetails(id)
    if (data?.data) {
      setProducts(data?.data)
      setMessage('')
      setLoading(false)
    }
    else {
      setMessage(data)
      setLoading(false)
    }
  }

  async function getRelatedProguctsApi() {
    setLoading(true)
    let data = await getRelatedProduct(categoryId)
    if (data?.data) {
      setRelatedproducts(data?.data)
      setMessage('')
      setLoading(false)
    }
    else {
      setMessage(data)
      setLoading(false)
    }
  }
  useEffect(() => {
    getproductDetailsApi();
    getRelatedProguctsApi();
  }, [id, categoryId]);

  if (loading)
    return <Loading></Loading>

  if (message)
    return <h2 className='text-red-700 my-3 font-bold'>{message}</h2>
  function changesrc(e) {
    setImagehover(e.target.src)
    console.log(e.target.src);
    
  }
  return (
    <div className='row items-center'>
      <div className="md:w-1/3">
        <img src={imghover ? imghover : products.imageCover} className='w-full' />
        <ul className='flex justify-center my-3 cursor-pointer gap-1'>
          {products?.images?.map(img => <li key={img}><motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={changesrc} src={img} /></li>)}
        </ul>
      </div>
      <div className="md:w-2/3">
        <p className='text-green-700'>{products?.category?.name}</p>
        <p className=' line-clamp-1'>{products?.title}</p>
        <p>{products?.description}</p>
        <div className='flex justify-between my-3 '>
          <p>{products?.price}</p>
          <p>{products?.ratingsAverage} <i className='fas fa-star text-yellow-500'></i> </p>
        </div>
        <div className="flex gap-3">
          <button className="btn bg-green-700 text-white p-2 rounded " onClick={() => { mutate(products?._id) }}>Add to cart</button>
          <button onClick={() => { whish(products?._id) }} className="btn bg-green-700 text-white p-2 rounded ">Add to Whishlist</button>
        </div>
      </div>
      <h2 className='text-green-500 text-xl my-5'>Related Products :</h2>
      <div className='row my-5'>
        {relatedproducts?.map(prod => <Item ele={prod} key={prod._id} changesrc={changesrc}/>)}
      </div>
    </div>
  )
}
