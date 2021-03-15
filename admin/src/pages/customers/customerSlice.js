import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  customerList: [],
  customerListStatus: 'idle',
  customerListError: null,
  customerById: [],
  customerByIdStatus: 'idle',
  customerByIdError: null,
  createCustomer: [],
  createCustomerStatus: 'idle',
  createCustomerError: null,
  customerDelete: [],
  customerDeleteStatus: 'idle',
  customerDeleteError: null,
  customerUpdate: [],
  customerUpdateStatus: 'idle',
  customerUpdateError: null,
}

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async () => {
    const response = await axios.get('http://localhost:4000/customers/read')
    return response
  },
)

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchCustomerById',
  async (id) => {
    const response = await axios.get(
      `http://localhost:4000/customers/read/${id}`,
    )
    return response
  },
)

export const createNewCustomer = createAsyncThunk(
  'customers/createNewCustomer',
  async (data) => {
    const response = await axios.post(
      'http://localhost:4000/customers/create',
      data,
    )
    return response
  },
)

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id) => {
    const response = await axios.delete(
      `http://localhost:4000/customers/delete/${id}`,
    )
    return response
  },
)

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (id, data) => {
    const response = await axios.put(
      `http://localhost:4000/customers/update/${id}`,
      data,
    )
    return response
  },
)

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearCustomerByIdData: (state) => {
      state.customerById = []
    },
    clearCustomerByIdStatus: (state) => {
      state.customerByIdStatus = 'idle'
    },
    clearCustomerDeleteStatus: (state) => {
      state.customerDeleteStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchCustomers.pending]: (state) => {
      state.customerListStatus = 'loading'
    },
    [fetchCustomers.fulfilled]: (state, action) => {
      state.customerListStatus = 'succeeded'
      state.customerList = state.customerList.concat(action.payload.data)
    },
    [fetchCustomers.rejected]: (state, action) => {
      state.customerListStatus = 'failed'
      state.customerListError = action.error.message
    },
    [fetchCustomerById.pending]: (state) => {
      state.customerByIdStatus = 'loading'
    },
    [fetchCustomerById.fulfilled]: (state, action) => {
      state.customerByIdStatus = 'succeeded'
      state.customerById = action.payload.data[0]
    },
    [fetchCustomerById.rejected]: (state, action) => {
      state.customerByIdStatus = 'failed'
      state.customerByIdError = action.error.message
    },
    [createNewCustomer.pending]: (state) => {
      state.createCustomerStatus = 'loading'
    },
    [createNewCustomer.fulfilled]: (state, action) => {
      state.createCustomerStatus = 'succeeded'
      state.customerList = state.customerList.concat(action.payload.data[0])
    },
    [createNewCustomer.rejected]: (state, action) => {
      state.createCustomerStatus = 'failed'
      state.createCustomerError = action.error.message
    },
    [deleteCustomer.pending]: (state) => {
      state.customerDeleteStatus = 'loading'
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.customerDeleteStatus = 'succeeded'
      state.customerDelete = action.payload.data
      const array = current(state.customerList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload.data)
      console.log(array)
      console.log(temp)
      state.customerList = temp
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.customerDeleteStatus = 'failed'
      state.customerDeleteError = action.error.message
    },
    [updateCustomer.pending]: (state) => {
      state.customerUpdateStatus = 'loading'
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.customerUpdateStatus = 'succeeded'
      state.customerUpdate = action.payload.data
    },
    [updateCustomer.rejected]: (state, action) => {
      state.customerUpdateStatus = 'failed'
      state.customerUpdateError = action.error.message
    },
  },
})

export const {
  clearCustomerByIdData,
  clearCustomerByIdStatus,
  clearCustomerDeleteStatus,
} = customersSlice.actions

export const selectAllCustomer = (state) => state.customers

export const selectCustomerById = (state, customerId) =>
  state.customers.find((customer) => customer.id === customerId)

export default customersSlice.reducer
