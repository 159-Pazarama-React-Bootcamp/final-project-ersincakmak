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
import ApplicationCreate from '..'
import api from '../../../constants/axios'
import { ApplicationMock } from '../../../mocks/Application'
import store from '../../../redux/store'

jest.mock('../../../constants/axios.ts')
jest.mock('react-toastify')

const mockedToast = toast as jest.Mocked<typeof toast>

const mockedAxios = api as jest.Mocked<typeof api>
const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' })

const renderElement = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ApplicationCreate />
    </BrowserRouter>
  </Provider>
)

describe('ApplicationCreate Page Test', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should render correctly', () => {
    const { baseElement } = render(renderElement())
    expect(baseElement).toBeInTheDocument()
  })

  it('should add and remove files correctly', async () => {
    global.URL.createObjectURL = jest.fn()
    await act(async () => {
      const { getByTestId, getByText, queryByText } = render(renderElement())
      fireEvent.drop(getByTestId('dropzone-input'), {
        target: {
          files: [mockFile],
        },
      })
      await waitFor(() => expect(getByText(/hello\.png/i)).toBeInTheDocument())
      fireEvent.click(getByText(/hello\.png/i))
      fireEvent.click(getByTestId('delete-button'))
      expect(queryByText(/hello\.png/i)).not.toBeInTheDocument()
    })
  })

  it('should create application successfully', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        data: ApplicationMock,
      },
    })

    await act(async () => {
      const { getByPlaceholderText, getByRole, getByTestId } = render(
        renderElement()
      )

      await fireEvent.change(getByPlaceholderText(/john/i), {
        target: {
          value: 'Test',
        },
      })

      await fireEvent.change(getByPlaceholderText(/doe/i), {
        target: {
          value: 'Test',
        },
      })

      await fireEvent.change(getByPlaceholderText(/22/i), {
        target: {
          value: 22,
        },
      })

      await fireEvent.change(
        getByPlaceholderText(/your tc identification number/i),
        {
          target: {
            value: '34520013560',
          },
        }
      )

      await fireEvent.change(getByPlaceholderText(/your address/i), {
        target: {
          value: 'Address Field',
        },
      })

      await fireEvent.change(
        getByPlaceholderText(/reason of your application/i),
        {
          target: {
            value: 'Application Reason Field',
          },
        }
      )

      await fireEvent.click(
        getByRole('button', {
          name: /create/i,
        })
      )

      await waitFor(() => expect(mockedAxios.post).toBeCalled())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      expect(window.location.pathname).toBe('/basvuru-basarili')
    })
  })

  it('should not navigate when request rejected', async () => {
    mockedAxios.post.mockRejectedValue({})

    await act(async () => {
      const { getByPlaceholderText, getByRole, getByTestId } = render(
        renderElement()
      )

      await fireEvent.change(getByPlaceholderText(/john/i), {
        target: {
          value: 'Test',
        },
      })

      await fireEvent.change(getByPlaceholderText(/doe/i), {
        target: {
          value: 'Test',
        },
      })

      await fireEvent.change(getByPlaceholderText(/22/i), {
        target: {
          value: 22,
        },
      })

      await fireEvent.change(
        getByPlaceholderText(/your tc identification number/i),
        {
          target: {
            value: '34520013560',
          },
        }
      )

      await fireEvent.change(getByPlaceholderText(/your address/i), {
        target: {
          value: 'Address Field',
        },
      })

      await fireEvent.change(
        getByPlaceholderText(/reason of your application/i),
        {
          target: {
            value: 'Application Reason Field',
          },
        }
      )

      await fireEvent.click(
        getByRole('button', {
          name: /create/i,
        })
      )

      await waitFor(() => expect(mockedAxios.post).toBeCalled())
      await waitForElementToBeRemoved(getByTestId('spinner'))
      expect(mockedToast.error).toBeCalled()
    })
  })
})
