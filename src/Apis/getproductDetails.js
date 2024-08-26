import axios from "axios";
export async function getproductDetails(prodId) {
    try {
        let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`);
        return data.data;
      } catch (error) {
        console.log(error)
      }
}