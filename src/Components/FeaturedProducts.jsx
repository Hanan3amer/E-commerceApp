import React, { useState } from 'react'
import { useEffect } from 'react'
import { getProducts } from '../Apis/getProducts'
import Loading from './Loading'
import Item from './Item'

export default function FeaturedProducts({ cat }) {
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState(false)
    let [message, setMessage] = useState('')
    async function getProductsApi() {
        setLoading(true)
        let data = await getProducts()
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
    useEffect(() => {
        getProductsApi()
    }, [])

    if (loading)
        return <Loading></Loading>

    if (message)
        return <h2 className='text-red-700 my-3 font-bold'>{message}</h2>
    return (
        <div className='row'>
            {cat?.length? cat.map(prod => <Item key={prod?._id} ele={prod}></Item>) :
                products.map(prod => <Item key={prod?._id} ele={prod}></Item>)}

        </div>
    )
}
