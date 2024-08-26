import axios from "axios";

let base = `https://ecommerce.routemisr.com/api/v1`;
let token = localStorage.getItem('userToken');

export function addToWishlist(productId) {
    return axios.post(`${base}/wishlist`, { productId }, {
        headers: {
            token
        }
    });
}

export function getWishlist() {
    return axios.get(`${base}/wishlist`, {
        headers: {
            token
        }
    });
}

export function removeFromWishlist(id) {
    return axios.delete(`${base}/wishlist/${id}`, {
        headers: {
            token
        }
    });
}