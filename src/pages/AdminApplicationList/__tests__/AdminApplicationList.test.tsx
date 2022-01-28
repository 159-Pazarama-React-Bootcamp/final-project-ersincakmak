import { render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AdminApplicationList from '..'
import api from '../../../constants/axios'
import { ApplicationMock } from '../../../mocks/Application'
import store from '../../../redux/store'

jest.mock('../../../constants/axios.ts')
const mockedAxios = api as jest.Mocked<typeof api>

const renderElement = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AdminApplicationList />
    </BrowserRouter>
  </Provider>
)

describe('AdminApplicationList Page Test', () => {
  it('should render correctly without data', async () => {
    mockedAxios.get.mockRejectedValue({})
    await act(async () => {
      const { baseElement } = render(renderElement())
      expect(baseElement).toBeInTheDocument()
    })
  })

  it('should render correctly with data', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        data: [{ ...ApplicationMock }],
      },
    })
    await act(async () => {
      const { baseElement } = render(renderElement())
      expect(baseElement).toBeInTheDocument()
    })
  })
})
