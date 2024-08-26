import React, { useEffect, useState } from 'react'
import FeaturedProducts from './FeaturedProducts'
import { getcategories } from '../Apis/getCategories'
import Loading from './Loading'
import { getRelatedProduct } from '../Apis/getProducts'
export default function Categories() {
  let [category, setcategory] = useState([])
  let [cat, setCat] = useState([])
  let [loading, setLoading] = useState(false)
  let [message, setMessage] = useState('')
  async function getCategoriesApi() {
    setLoading(true)
    let data = await getcategories()
    if (data?.data) {
      setcategory(data?.data)
      setMessage('')
      setLoading(false)
    }
    else {
      setMessage(data)
      setLoading(false)
    }
  }
  useEffect(() => {
    getCategoriesApi()
  }, [])
  async function getData(id) {
    let data = await getRelatedProduct(id)
    setCat(data?.data)

  }
  if (loading)
    return <Loading></Loading>

  if (message)
    return <h2 className='text-red-700 my-3 font-bold'>{message}</h2>
  return (
    <>
      <div className="row">
        <ul className='flex items-center justify-center text-center gap-5 mx-auto my-5'>
          {category.map(ele => <li className='text-green-600  hover:text-gray-900 cursor-pointer' key={ele._id} onClick={() => getData(ele?._id)}>{ele?.name}</li>)}
        </ul>
      </div>
      <FeaturedProducts cat={cat} />
    </>
  )
}
