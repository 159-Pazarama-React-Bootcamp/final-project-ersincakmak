import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ApplicationRow from '..'
import { ApplicationMock } from '../../../mocks/Application'

describe('Dropzone Test', () => {
  it('should render Dropzone component', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ApplicationRow application={ApplicationMock} />
      </BrowserRouter>
    )
    expect(baseElement).toBeInTheDocument()
  })
})
