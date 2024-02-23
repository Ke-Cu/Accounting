import axios from 'axios'

const DEFAULT_CONFIG = {
  baseURL: 'http://106.55.179.247:5000/accounting/',
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
  },
}

const createEndpoint = (config, fullResponse) => {
  let endpoint = axios.create({ ...DEFAULT_CONFIG, ...config })
  endpoint.interceptors.request.use(
    config => {
      console.log(config, parseResponse)
      if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Basic ' + localStorage.getItem('token')
      }
      return config
    },
    error => {
      console.error(error)
      return Promise.reject(error)
    },
  )
  endpoint.interceptors.response.use(
    (response) => {
      // console.log(response)
      if (fullResponse) {
        return response
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
