import { render } from '@testing-library/react'
import React from 'react'
import Spinner from '..'

describe('Spinner Test', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<Spinner size="sm" />)
    expect(baseElement).toBeInTheDocument()
  })

  it('should render md size correctly', () => {
    const { baseElement } = render(<Spinner size="md" />)
    expect(baseElement).toBeInTheDocument()
  })

  it('should render xl size correctly', () => {
    const { baseElement } = render(<Spinner size="xl" />)
    expect(baseElement).toBeInTheDocument()
  })
})
