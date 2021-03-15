import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  itemList: [],
  itemListStatus: 'idle',
  itemListError: null,
  itemById: [],
  itemByIdStatus: 'idle',
  itemByIdError: null,
  createItem: [],
  createItemStatus: 'idle',
  createItemError: null,
  itemDelete: [],
  itemDeleteStatus: 'idle',
  itemDeleteError: null,
  itemUpdate: [],
  itemUpdateStatus: 'idle',
  itemUpdateError: null,
}

export const fetchItem = createAsyncThunk('items/fetchItem', async () => {
  const response = await axios.get('http://localhost:4000/items/read')
  return response
})

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id) => {
    const response = await axios.get(`http://localhost:4000/items/read/${id}`)
    return response
  },
)

export const createNewItem = createAsyncThunk(
  'items/createNewItem',
  async (data) => {
    const response = await axios.post(
      'http://localhost:4000/items/create',
      data,
    )
    return response
  },
)

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  const response = await axios.delete(
    `http://localhost:4000/items/delete/${id}`,
  )
  return response
})

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async (id, data) => {
    const response = await axios.put(
      `http://localhost:4000/items/update/${id}`,
      data,
    )
    return response
  },
)

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearItemByIdData: (state) => {
      state.itemById = []
    },
    clearItemByIdStatus: (state) => {
      state.itemByIdStatus = 'idle'
    },
    clearItemDeleteStatus: (state) => {
      state.itemDeleteStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchItem.pending]: (state) => {
      state.itemListStatus = 'loading'
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.itemListStatus = 'succeeded'
      state.itemList = state.itemList.concat(action.payload.data)
    },
    [fetchItem.rejected]: (state, action) => {
      state.itemListStatus = 'failed'
      state.itemListError = action.error.message
    },
    [fetchItemById.pending]: (state) => {
      state.itemByIdStatus = 'loading'
    },
    [fetchItemById.fulfilled]: (state, action) => {
      state.itemByIdStatus = 'succeeded'
      state.itemById = action.payload.data[0]
    },
    [fetchItemById.rejected]: (state, action) => {
      state.itemByIdStatus = 'failed'
      state.itemByIdError = action.error.message
    },
    [createNewItem.pending]: (state) => {
      state.createItemStatus = 'loading'
    },
    [createNewItem.fulfilled]: (state, action) => {
      state.createItemStatus = 'succeeded'
      state.itemList = state.itemList.concat(action.payload.data[0])
    },
    [createNewItem.rejected]: (state, action) => {
      state.createItemStatus = 'failed'
      state.createItemError = action.error.message
    },
    [deleteItem.pending]: (state) => {
      state.itemDeleteStatus = 'loading'
    },
    [deleteItem.fulfilled]: (state, action) => {
      state.itemDeleteStatus = 'succeeded'
      state.itemDelete = action.payload.data
      const array = current(state.itemList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload.data)
      console.log(array)
      console.log(temp)
      state.itemList = temp
    },
    [deleteItem.rejected]: (state, action) => {
      state.itemDeleteStatus = 'failed'
      state.itemDeleteError = action.error.message
    },
    [updateItem.pending]: (state) => {
      state.itemUpdateStatus = 'loading'
    },
    [updateItem.fulfilled]: (state, action) => {
      state.itemUpdateStatus = 'succeeded'
      state.itemUpdate = action.payload.data
    },
    [updateItem.rejected]: (state, action) => {
      state.itemUpdateStatus = 'failed'
      state.itemUpdateError = action.error.message
    },
  },
})

export const {
  clearItemByIdData,
  clearItemByIdStatus,
  clearItemDeleteStatus,
} = itemsSlice.actions

export const selectAllItem = (state) => state.itemList

export const selectItemById = (state, itemId) =>
  state.items.find((data) => data.id === itemId)

export default itemsSlice.reducer
