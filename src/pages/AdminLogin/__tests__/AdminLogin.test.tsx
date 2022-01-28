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
import { toast } from 'react-toastify'
import AdminLogin from '..'
import api from '../../../constants/axios'
import store from '../../../redux/store'

jest.mock('../../../constants/axios.ts')
jest.mock('react-toastify')

const mockedAxios = api as jest.Mocked<typeof api>
const mockedToast = toast as jest.Mocked<typeof toast>

const renderElement = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AdminLogin />
    </BrowserRouter>
  </Provider>
)

describe('AdminLogin Page Test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const { baseElement } = render(renderElement())
    expect(baseElement).toBeInTheDocument()
  })

  it('should navigate when login successfull', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        data: {
          username: 'Test Username',
          name: 'Test Name',
        },
      },
    })

    await act(async () => {
      const { getByRole, getByLabelText, getByTestId } = render(renderElement())

      await fireEvent.change(
        getByRole('textbox', {
          name: /username/i,
        }),
        {
          target: {
            value: 'test',
          },
        }
      )

      await fireEvent.change(getByLabelText(/password/i), {
        target: {
          value: 'test',
        },
      })

      await fireEvent.click(
        getByRole('button', {
          name: /login/i,
        })
      )

      await waitFor(async () => expect(mockedAxios.post).toBeCalled())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      expect(window.location.pathname).toBe('/admin/basvuru-listesi')
    })
  })

  it('should navigate when login rejected', async () => {
    mockedAxios.post.mockRejectedValue({})

    await act(async () => {
      const { getByRole, getByLabelText, getByTestId } = render(renderElement())

      await fireEvent.change(
        getByRole('textbox', {
          name: /username/i,
        }),
        {
          target: {
            value: 'test',
          },
        }
      )

      await fireEvent.change(getByLabelText(/password/i), {
        target: {
          value: 'test',
        },
      })

      await fireEvent.click(
        getByRole('button', {
          name: /login/i,
        })
      )

      await waitFor(() => expect(mockedAxios.post).toBeCalled())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      await waitFor(() => expect(mockedToast.error).toBeCalled())
    })
  })
})
