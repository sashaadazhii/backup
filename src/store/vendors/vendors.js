import { vendorsList, vendorExpenses, vendorReport } from '../data/vendors'

export default {
  namespaced: true,
  state: {
    vendors: vendorsList,
    searchParams: null,
    vendorExpenses,
    vendorReport
  },
  mutations: {
    set(state, vendors) {
      state.vendors = vendors
    },

    setSearch(state, searchParams) {
      state.searchParams = searchParams
      const search = searchParams?.toLocaleLowerCase() || ''
      const filterVendors = vendorsList.filter(v => {
        return v.businessName.toLocaleLowerCase().includes(search)
      })
      state.vendors = filterVendors
    }
  },
  actions: {}
}