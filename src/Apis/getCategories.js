import axios from "axios";
export async function getcategories() {
    try {
      let data = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data;
    } catch (error) {
      console.log(error)
    }
  }