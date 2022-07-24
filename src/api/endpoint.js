import axios from 'axios'

const DEFAULT_CONFIG = {
  baseURL: 'http://106.55.179.247:5000/accounting/',
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
  },
}

const createEndpoint = (config, parseResponse = true) => {
  let endpoint = axios.create({ ...DEFAULT_CONFIG, ...config })
  endpoint.interceptors.response.use(
    (response) => {
      if (parseResponse) {
        return response.data.data === undefined
          ? response.data
          : response.data.data
      }
      return response.data
    },
    async (error) => {
      console.error(error.message)
      return Promise.reject(error)
    }
  )
  return endpoint
}

export default createEndpoint
