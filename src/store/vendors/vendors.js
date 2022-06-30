import { vendorsList, vendorExpenses, vendorReport } from '../data/vendors'

export default {
  namespaced: true,
  state: {
    vendors: vendorsList,
    vendor: {},
    searchParams: null,
    vendorExpenses,
    vendorReport
  },
  mutations: {
    set(state, vendors) {
      state.vendors = vendors
    },
    setVendor(state, vendor) {
      state.vendor = vendor
    },
    setSearch(state, searchParams) {
      state.searchParams = searchParams
      const search = searchParams?.toLocaleLowerCase() || ''
      const filterVendors = vendorsList.filter(v => {
        return v.businessName.toLocaleLowerCase().includes(search)
      })
      state.vendors = filterVendors
    },
    create(state, vendor) {
      state.vendor = vendor
      state.vendors.unshift(vendor)
    },
  },
  actions: {}
}