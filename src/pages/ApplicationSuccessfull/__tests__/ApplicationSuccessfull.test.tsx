import { render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ApplicationSuccessfull from '..'
import api from '../../../constants/axios'
import { ApplicationMock } from '../../../mocks/Application'
import { createApplication } from '../../../redux/slices/applicationSlice'
import store from '../../../redux/store'

jest.mock('../../../constants/axios.ts')
const mockedAxios = api as jest.Mocked<typeof api>

const renderElement = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ApplicationSuccessfull />
    </BrowserRouter>
  </Provider>
)

describe('ApplicationSuccessfull Page Test', () => {
  it('should render correctly with data', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        data: ApplicationMock,
      },
    })

    await act(async () => {
      const { queryByText } = render(renderElement())
      await store.dispatch(createApplication(new FormData()))
      expect(
        queryByText(/Your application has been completed successfully/i)
      ).toBeInTheDocument()
    })
  })
})
