import createEndpoint from './endpoint'

const endpoint = createEndpoint({})

const { get } = endpoint

export const accounting = {
  getToday: async () => get('today'),
  getScopeAmount: async (params) => get('recentdays', { params }),
  getMonthBill: async (params) => get('monthlystatistics', { params }),
}
