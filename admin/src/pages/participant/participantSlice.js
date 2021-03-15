import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  participantList: [],
  participantListStatus: 'idle',
  participantListError: null,
  participantById: [],
  participantByIdStatus: 'idle',
  participantByIdError: null,
  createParticipant: [],
  createParticipantStatus: 'idle',
  createParticipantError: null,
  participantDelete: [],
  participantDeleteStatus: 'idle',
  participantDeleteError: null,
  participantUpdate: [],
  participantUpdateStatus: 'idle',
  participantUpdateError: null,
}

export const fetchParticipant = createAsyncThunk(
  'participant/fetchParticipant',
  async () => {
    const response = await axios.get('http://localhost:4000/participant/read')
    return response
  },
)

export const fetchParticipantById = createAsyncThunk(
  'participant/fetchParticipantById',
  async (id) => {
    const response = await axios.get(
      `http://localhost:4000/participant/read/${id}`,
    )
    return response
  },
)

export const createNewParticipant = createAsyncThunk(
  'participant/createNewParticipant',
  async (data) => {
    const response = await axios.post(
      'http://localhost:4000/participant/create',
      data,
    )
    return response
  },
)

export const deleteParticipant = createAsyncThunk(
  'participant/deleteParticipant',
  async (id) => {
    const response = await axios.delete(
      `http://localhost:4000/participant/delete/${id}`,
    )
    return response
  },
)

export const updateParticipant = createAsyncThunk(
  'participant/updateParticipant',
  async (id, data) => {
    const response = await axios.put(
      `http://localhost:4000/participant/update/${id}`,
      data,
    )
    return response
  },
)

const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    clearParticipantByIdData: (state) => {
      state.participantById = []
    },
    clearParticipantByIdStatus: (state) => {
      state.participantByIdStatus = 'idle'
    },
    clearParticipantDeleteStatus: (state) => {
      state.participantDeleteStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchParticipant.pending]: (state) => {
      state.participantListStatus = 'loading'
    },
    [fetchParticipant.fulfilled]: (state, action) => {
      state.participantListStatus = 'succeeded'
      state.participantList = state.participantList.concat(action.payload.data)
    },
    [fetchParticipant.rejected]: (state, action) => {
      state.participantListStatus = 'failed'
      state.participantListError = action.error.message
    },
    [fetchParticipantById.pending]: (state) => {
      state.participantByIdStatus = 'loading'
    },
    [fetchParticipantById.fulfilled]: (state, action) => {
      state.participantByIdStatus = 'succeeded'
      state.participantById = action.payload.data[0]
    },
    [fetchParticipantById.rejected]: (state, action) => {
      state.participantByIdStatus = 'failed'
      state.participantByIdError = action.error.message
    },
    [createNewParticipant.pending]: (state) => {
      state.createParticipantStatus = 'loading'
    },
    [createNewParticipant.fulfilled]: (state, action) => {
      state.createParticipantStatus = 'succeeded'
      state.participantList = state.participantList.concat(
        action.payload.data[0],
      )
    },
    [createNewParticipant.rejected]: (state, action) => {
      state.createParticipantStatus = 'failed'
      state.createParticipantError = action.error.message
    },
    [deleteParticipant.pending]: (state) => {
      state.participantDeleteStatus = 'loading'
    },
    [deleteParticipant.fulfilled]: (state, action) => {
      state.participantDeleteStatus = 'succeeded'
      state.participantDelete = action.payload.data
      const array = current(state.participantList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload.data)
      // console.log(temp)
      state.participantList = temp
    },
    [deleteParticipant.rejected]: (state, action) => {
      state.participantDeleteStatus = 'failed'
      state.participantDeleteError = action.error.message
    },
    [updateParticipant.pending]: (state) => {
      state.participantUpdateStatus = 'loading'
    },
    [updateParticipant.fulfilled]: (state, action) => {
      state.participantUpdateStatus = 'succeeded'
      state.participantUpdate = action.payload.data
    },
    [updateParticipant.rejected]: (state, action) => {
      state.participantUpdateStatus = 'failed'
      state.participantUpdateError = action.error.message
    },
  },
})

export const {
  clearParticipantByIdData,
  clearParticipantByIdStatus,
  clearParticipantDeleteStatus,
} = participantSlice.actions

export const selectAllParticipant = (state) => state.participant

export const selectParticipantById = (state, participantId) =>
  state.participant.find((parti) => parti.id === participantId)

export default participantSlice.reducer
