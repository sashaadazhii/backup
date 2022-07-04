import { vendorsList, vendorExpenses, vendorReport, expenseAccounts } from '../data/vendors'

export default {
  namespaced: true,
  state: {
    vendors: vendorsList,
    vendor: {},
    searchParams: null,
    expenses: vendorExpenses,
    expense: {},
    expensesTypes: expenseAccounts,
    expensesType: {},
    vendorReport
  },
  mutations: {
    set(state, vendors) {
      state.vendors = vendors
    },
    setVendor(state, vendor) {
      state.vendor = vendor
    },
    setExpenses(state, expenses) {
      state.expenses = expenses
    },
    setExpense(state, expense) {
      state.expense = expense
    },
    setExpensesTypes(state, expensesTypes) {
      state.expensesTypes
        = expensesTypes
    },
    setExpensesType(state, expensesType) {
      state.expensesType
        = expensesType
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

    createExpense(state, expense) {
      state.expense = expense
      state.expenses.unshift(expense)
    },
    createExpensesType(state, expensesType) {
      state.expensesType = expensesType
      state.expensesTypes.push(expensesType)
    },
  },
  actions: {}
}