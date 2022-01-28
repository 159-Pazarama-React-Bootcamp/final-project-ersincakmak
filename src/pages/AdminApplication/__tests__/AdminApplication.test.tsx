import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AdminApplication from '..'
import api from '../../../constants/axios'
import {
  ApplicationMock,
  ApplicationMockWithAnswer,
  ApplicationMockWithStatus,
} from '../../../mocks/Application'
import store from '../../../redux/store'

jest.mock('../../../constants/axios.ts')
const mockedAxios = api as jest.Mocked<typeof api>

const renderElement = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AdminApplication />
    </BrowserRouter>
  </Provider>
)

describe('AdminApplication Page Test', () => {
  it('should render notfound when application does not exist', async () => {
    mockedAxios.get.mockRejectedValue({})
    await act(async () => {
      const { getByTestId, getByText } = render(renderElement())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      expect(getByText(/404/i)).toBeInTheDocument()
    })
  })

  it('should render application correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: ApplicationMock,
      },
    })

    await act(async () => {
      const { getByTestId, getByText } = render(renderElement())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      expect(getByText(/First Name Test/i)).toBeInTheDocument()
    })
  })

  it('should change status with selectbox', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: ApplicationMock,
      },
    })
    mockedAxios.patch.mockResolvedValueOnce({
      data: {
        data: ApplicationMockWithStatus('solved'),
      },
    })

    await act(async () => {
      const { getByTestId, getByRole } = render(renderElement())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      fireEvent.change(getByRole('combobox'), {
        target: {
          value: 'solved',
        },
      })
      fireEvent.click(
        getByRole('button', {
          name: /update status/i,
        })
      )
      await waitForElementToBeRemoved(getByTestId('spinner'))
      expect(getByTestId('status-badge').innerHTML).toBe('solved')
    })
  })

  it('should add answer correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: ApplicationMock,
      },
    })
    mockedAxios.post.mockResolvedValue({
      data: {
        data: ApplicationMockWithAnswer({
          _id: '12345',
          author: {
            name: 'Admin',
            username: 'Admin',
          },
          message: 'Admin answer message',
        }),
      },
    })

    await act(async () => {
      const { getByTestId, getByRole, getByText } = render(renderElement())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      fireEvent.change(getByRole('textbox'), {
        target: {
          value: 'Admin answer message',
        },
      })
      fireEvent.click(
        getByRole('button', {
          name: /create answer/i,
        })
      )
      await waitFor(() => expect(mockedAxios.post).toBeCalled())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      expect(getByText(/Admin answer message/i)).toBeInTheDocument()
    })
  })
})
