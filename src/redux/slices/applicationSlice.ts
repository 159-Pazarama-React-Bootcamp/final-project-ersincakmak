import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../constants/axios'
import { IApplication, IApplicationState } from '../../types/application'

export const createApplication = createAsyncThunk(
  'application/create',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('create-application', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return data.data as IApplication
    } catch (error) {
      return rejectWithValue((error as any).response.data.message)
    }
  }
)

const initialState: IApplicationState = {
  application: null,
  message: '',
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createApplication.pending, (state) => {
        state.message = ''
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.application = action.payload
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.application = null
        state.message = action.payload as string
      })
  },
})

export default applicationSlice.reducer
