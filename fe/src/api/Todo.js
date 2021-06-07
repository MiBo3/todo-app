import axios from 'axios';

const api = (() => {
  const url = `${process.env.REACT_APP_API_URL}/todos`

  return {
    fetch: (query={}) => {
      return axios.get(url, {
        params: query
      });
    },
    delete: (id) => {
      return axios.delete(url, {
        params: { id }
      })
    },
    update: (item) => {
      return axios.put(url, item)
    },
    create: (item) => {
      return axios.post(url, item);
    }
  }
})()

export default api
