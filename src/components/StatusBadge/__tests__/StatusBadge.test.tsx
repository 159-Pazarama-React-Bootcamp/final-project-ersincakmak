import { render } from '@testing-library/react'
import React from 'react'
import StatusBadge from '..'

describe('StatusBadge test', () => {
  it('should render correctly', () => {
    const { baseElement } = render(<StatusBadge status="waiting" />)

    expect(baseElement).toBeInTheDocument()
  })
})
