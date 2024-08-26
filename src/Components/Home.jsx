import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Mainslider from './Mainslider'
import Slides from './Slides'

export default function Home() {
  return (
    <div>
      <Mainslider></Mainslider>
      <Slides></Slides>
      <FeaturedProducts></FeaturedProducts>
    </div>
  )
}
