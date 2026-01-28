
import axios from 'axios';


const api = async (method, route, body = {}, query = {}) => {
    const response = await axios({
      method: method.toLowerCase(),
      url: `${process.env.url}/${route}`,
      data: body,
      params: query,
    });
  
    return response.data;
};
  
export default api;