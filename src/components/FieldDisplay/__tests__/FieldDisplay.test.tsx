import { render } from '@testing-library/react'
import React from 'react'
import FieldDisplay from '..'

describe('FieldDisplay test', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<FieldDisplay title="Test" />)
    expect(baseElement).toBeInTheDocument()
  })
})
