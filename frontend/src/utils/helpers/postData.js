import axios from "axios";

export async function postData(token, route, params = undefined) {
  try {
    const response = await axios.post(`/api/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
      data: {
        // TODO
      }
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.statusText);
  }
}
