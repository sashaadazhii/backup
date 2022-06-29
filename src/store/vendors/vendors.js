import axios from 'axios'

import { vendorsList } from '../data/vendors'

export default {
  namespaced: true,
  state: {
    // vendors: [],
    vendors: vendorsList,
    vendor: {},
    searchParams: null,
    pagination: {},
    page: 1
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
        const res = v.businessName.toLocaleLowerCase().includes(search)
        return res
      })
      state.vendors = filterVendors

    },
    add(state, vendor) {
      //???
      vendorsList.unshift(vendor)
      state.vendors.unshift(vendor)
      // ???
    },
  },
  actions: {}
}