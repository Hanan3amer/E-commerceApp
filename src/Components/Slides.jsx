import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { getcategories } from '../Apis/getCategories';
import Slider from 'react-slick';
export default function Slides() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    autopalySpeed: 1500
  };
  let [category, setcategory] = useState([])
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

  if (loading)
    return <Loading></Loading>

  if (message)
    return <h2 className='text-red-700 my-3 font-bold'>{message}</h2>
  return (
    <div className=' hidden md:block'>
      <Slider {...settings}>
        {category.map(ele => <img key={ele._id} src={ele?.image} className='h-[180px]' style={{ objectFit: 'cover' }}/>)}
      </Slider>
    </div>
  )
}
