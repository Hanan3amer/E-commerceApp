import axios from "axios";
export async function getProducts() {
    try {
      let data = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      return data.data;
    } catch (error) {
      console.log(error)
    }
  }
export async function getRelatedProduct(categoryId) {
    try {
      let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
      return data.data;
    } catch (error) {
      console.log(error)
    }
  }