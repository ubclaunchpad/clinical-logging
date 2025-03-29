import axios from "axios";

export async function postData(token, route, data = {}) {
    try {
      const response = await axios.post(`/api/${route}`,
        data, 
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(error.response.statusText);
    }
  }
