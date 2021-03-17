import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dhhknjwtnaoyrjdgvqdj.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTg1MjAxMCwiZXhwIjoxOTMxNDI4MDEwfQ.PZtrW8vYSjrpZQQ6OX-a-oD4jXHcmNWrmC7OPtBX-lc'
const supabase = createClient(supabaseUrl, supabaseKey)

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
    const response = await supabase.from('customers').select()
    return response
  },
)

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchCustomerById',
  async (id) => {
    const response = await supabase.from('customers').select('*').eq('id', id)
    return response
  },
)

export const createNewCustomer = createAsyncThunk(
  'customers/createNewCustomer',
  async (data) => {
    const response = await supabase.from('customers').insert([data])
    return response
  },
)

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id) => {
    await supabase.from('customers').delete().match({ id: id })
    return id
  },
)

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (id, data) => {
    const response = await supabase
      .from('customers')
      .update(data)
      .eq('name', id)
    return response
    console.log(response)
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
      const temp = array.filter((element) => element.id != action.payload)
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
