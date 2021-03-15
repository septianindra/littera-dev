import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  packageList: [],
  packageListStatus: 'idle',
  packageListError: null,
  packageById: [],
  packageByIdStatus: 'idle',
  packageByIdError: null,
  createPackage: [],
  createPackageStatus: 'idle',
  createPackageError: null,
  packageDelete: [],
  packageDeleteStatus: 'idle',
  packageDeleteError: null,
  packageUpdate: [],
  packageUpdateStatus: 'idle',
  packageUpdateError: null,
}

export const fetchPackage = createAsyncThunk(
  'packages/fetchPackage',
  async () => {
    const response = await axios.get('http://localhost:4000/packages/read')
    return response
  },
)

export const fetchPackageById = createAsyncThunk(
  'packages/fetchPackageById',
  async (id) => {
    const response = await axios.get(
      `http://localhost:4000/packages/read/${id}`,
    )
    return response
  },
)

export const createNewPackage = createAsyncThunk(
  'packages/createNewPackage',
  async (data) => {
    const response = await axios.post(
      'http://localhost:4000/packages/create',
      data,
    )
    return response
  },
)

export const deletePackage = createAsyncThunk(
  'packages/deletePackage',
  async (id) => {
    const response = await axios.delete(
      `http://localhost:4000/packages/delete/${id}`,
    )
    return response
  },
)

export const updatePackage = createAsyncThunk(
  'packages/updatePackage',
  async (id, data) => {
    const response = await axios.put(
      `http://localhost:4000/packages/update/${id}`,
      data,
    )
    return response
  },
)

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    clearPackageByIdData: (state) => {
      state.packageById = []
    },
    clearPackageByIdStatus: (state) => {
      state.packageByIdStatus = 'idle'
    },
    clearPackageDeleteStatus: (state) => {
      state.packageDeleteStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchPackage.pending]: (state) => {
      state.packageListStatus = 'loading'
    },
    [fetchPackage.fulfilled]: (state, action) => {
      state.packageListStatus = 'succeeded'
      state.packageList = state.packageList.concat(action.payload.data)
    },
    [fetchPackage.rejected]: (state, action) => {
      state.packageListStatus = 'failed'
      state.packageListError = action.error.message
    },
    [fetchPackageById.pending]: (state) => {
      state.packageByIdStatus = 'loading'
    },
    [fetchPackageById.fulfilled]: (state, action) => {
      state.packageByIdStatus = 'succeeded'
      state.packageById = action.payload.data[0]
    },
    [fetchPackageById.rejected]: (state, action) => {
      state.packageByIdStatus = 'failed'
      state.packageByIdError = action.error.message
    },
    [createNewPackage.pending]: (state) => {
      state.createPackageStatus = 'loading'
    },
    [createNewPackage.fulfilled]: (state, action) => {
      state.createPackageStatus = 'succeeded'
      state.packageList = state.packageList.concat(action.payload.data[0])
    },
    [createNewPackage.rejected]: (state, action) => {
      state.createPackageStatus = 'failed'
      state.createPackageError = action.error.message
    },
    [deletePackage.pending]: (state) => {
      state.packageDeleteStatus = 'loading'
    },
    [deletePackage.fulfilled]: (state, action) => {
      state.packageDeleteStatus = 'succeeded'
      state.packageDelete = action.payload.data
      const array = current(state.packageList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload.data)
      state.packageList = temp
    },
    [deletePackage.rejected]: (state, action) => {
      state.packageDeleteStatus = 'failed'
      state.packageDeleteError = action.error.message
    },
    [updatePackage.pending]: (state) => {
      state.packageUpdateStatus = 'loading'
    },
    [updatePackage.fulfilled]: (state, action) => {
      state.packageUpdateStatus = 'succeeded'
      state.packageUpdate = action.payload.data
    },
    [updatePackage.rejected]: (state, action) => {
      state.packageUpdateStatus = 'failed'
      state.packageUpdateError = action.error.message
    },
  },
})

export const {
  clearPackageByIdData,
  clearPackageByIdStatus,
  clearPackageDeleteStatus,
} = packagesSlice.actions

export const selectAllPackage = (state) => state.packageList

export const selectPackageById = (state, packageId) =>
  state.packageList.find((data) => data.id === packageId)

export default packagesSlice.reducer
