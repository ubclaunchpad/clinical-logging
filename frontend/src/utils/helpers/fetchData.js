import axios from "axios";

export async function fetchData(token, route, params = undefined) {
  try {
    const response = await axios.get(`/api/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.statusText);
  }
}

export async function postData(token, route, params = {}) {
  try {
    const response = await axios.post(`/api/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.statusText);
  }
}
