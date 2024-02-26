import createEndpoint from './endpoint'

const endpoint = createEndpoint({})

const { get, post, delete: deleteMethod } = endpoint

export const accounting = {
  getToday: async () => get('today'),
  getScopeAmount: async (params) => get('recentdays', { params }),
  getMonthBill: async (params) => get('monthlystatistics', { params }),
  getBillByDate: async (params) => get('records-on-date', { params }),
  getTypes: async () => get('types'),
  addType: async (params) => post('type', params),
  addRecord: async (params) => post('record', params),
  delRecord: async (params) => deleteMethod('record', { params }),
}

const authEndpoint = createEndpoint({
  baseURL: 'http://106.55.179.247:5000/auth/'
})

const { get: authGet } = authEndpoint

export const auth = {
  verify: async () => authGet('verify', ""),
}