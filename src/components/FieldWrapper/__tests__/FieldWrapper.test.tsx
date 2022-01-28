import { render } from '@testing-library/react'
import React from 'react'
import FieldWrapper from '..'

describe('FieldWrapper test', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<FieldWrapper />)
    expect(baseElement).toBeInTheDocument()
  })
})
