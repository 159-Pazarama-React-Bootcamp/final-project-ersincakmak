import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ApplicationInquiry from '..'
import store from '../../../redux/store'

const renderElement = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ApplicationInquiry />
    </BrowserRouter>
  </Provider>
)

describe('ApplicationInquiry Page Test', () => {
  it('should render correctly', () => {
    const { baseElement } = render(renderElement())
    expect(baseElement).toBeInTheDocument()
  })

  it('should navigate correctyl when click Inquiry button', async () => {
    await act(async () => {
      const { getByRole } = render(renderElement())

      await fireEvent.change(
        getByRole('textbox', {
          name: /code/i,
        }),
        {
          target: { value: 'testCode' },
        }
      )
      await fireEvent.click(
        getByRole('button', {
          name: /inquiry/i,
        })
      )
      await waitFor(() =>
        expect(window.location.pathname).toBe('/basvuru/testCode')
      )
    })
  })
})
