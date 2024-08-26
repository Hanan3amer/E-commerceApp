import axios from "axios";
let base = `https://ecommerce.routemisr.com/api/v1`
let token = localStorage.getItem('userToken')
export function AddtoCart(productId) {
    return axios.post(`${base}/cart`, { productId }, {
        headers: {
            token
        }
    })
}

export function getCart() {
    return axios.get(`${base}/cart`, {
        headers: {
            token
        }
    })
}
export function deleteCart(id) {
    return axios.delete(`${base}/cart/${id}`, {
        headers: {
            token
        }
    })
}
export function updateCart({id,count}) {
    return axios.put(`${base}/cart/${id}`,{count}, {
        headers: {
            token
        }
    })
}