import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api, { getHeaders } from '../../constants/axios'
import { ILoginPayload, IUser, IUserState } from '../../types/admin'
import { IApplication, IStatus } from '../../types/application'

export const login = createAsyncThunk(
  'admin/login',
  async (payload: ILoginPayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post('admin/login', payload, {
        headers: {
          Authorization: getHeaders(),
        },
      })
      localStorage.setItem('token', data.data.accessToken as string)
      return data.data as IUser
    } catch (error) {
      return rejectWithValue((error as any).response.data.message as string)
    }
  }
)

export const getMe = createAsyncThunk(
  'admin/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('admin/getMe', {
        headers: {
          Authorization: getHeaders(),
        },
      })
      return data.data as IUser
    } catch (error) {
      localStorage.removeItem('token')
      return rejectWithValue((error as any).response.data.message as string)
    }
  }
)

export const getApplications = createAsyncThunk(
  'admin/getApplications',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('admin/applications', {
        headers: {
          Authorization: getHeaders(),
        },
      })
      return data.data as IApplication[]
    } catch (error) {
      return rejectWithValue((error as any).response.data.message as string)
    }
  }
)

export const getOneApplication = createAsyncThunk(
  'admin/getOneApplication',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`application/${id}`, {
        headers: {
          Authorization: getHeaders(),
        },
      })
      return data.data as IApplication
    } catch (error) {
      return rejectWithValue((error as any).response.data.message as string)
    }
  }
)

export const updateApplicationStatus = createAsyncThunk(
  'admin/updateApplicationStatus',
  async (
    {
      id,
      status,
    }: {
      id: string
      status: IStatus
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.patch(
        `admin/application/update-status/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: getHeaders(),
          },
        }
      )
      return data.data as IApplication
    } catch (error) {
      return rejectWithValue((error as any).response.data.message as string)
    }
  }
)

export const createAnswer = createAsyncThunk(
  'admin/createAnswer',
  async (
    {
      id,
      message,
    }: {
      id: string
      message: string
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post(
        `admin/application/create-answer/${id}`,
        { message },
        {
          headers: {
            Authorization: getHeaders(),
          },
        }
      )
      return data.data as IApplication
    } catch (error) {
      return rejectWithValue((error as any).response.data.message as string)
    }
  }
)

const initialState: IUserState = {
  applications: [],
  application: null,
  user: null,
  message: '',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.message = ''
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null
        state.message = action.payload as string
      })

    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(getMe.rejected, (state) => {
        state.user = null
      })

    builder
      .addCase(getApplications.fulfilled, (state, action) => {
        state.applications = action.payload
        state.message = ''
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.applications = []
        state.message = action.payload as string
      })

    builder
      .addCase(getOneApplication.fulfilled, (state, action) => {
        state.application = action.payload
        state.message = ''
      })
      .addCase(getOneApplication.rejected, (state, action) => {
        state.application = null
        state.message = action.payload as string
      })

    builder
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.application = action.payload
        state.message = ''
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.message = action.payload as string
      })

    builder
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.application = action.payload
        state.message = ''
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.message = action.payload as string
      })
  },
})

export const { logout } = adminSlice.actions

export default adminSlice.reducer
