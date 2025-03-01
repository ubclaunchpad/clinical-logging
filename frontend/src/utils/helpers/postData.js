import axios from "axios";

// TODO
export async function postData(token, route, params = undefined, data) {
  try {
    const response = await axios.post(`/api/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
      data: data
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.statusText);
  }
}