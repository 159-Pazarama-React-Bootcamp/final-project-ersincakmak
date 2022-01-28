import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AdminNav from '..'
import store from '../../../redux/store'

const renderElement = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AdminNav />
    </BrowserRouter>
  </Provider>
)

describe('AdminNav test', () => {
  it('should render correctly', async () => {
    const { baseElement } = render(renderElement())
    expect(baseElement).toBeInTheDocument()
  })

  it('should logout correctyl when click logout button', async () => {
    await act(async () => {
      const { getByRole } = render(renderElement())
      await fireEvent.click(
        getByRole('button', {
          name: /logout/i,
        })
      )
      expect(store.getState().admin.user).toBe(null)
    })
  })
})
