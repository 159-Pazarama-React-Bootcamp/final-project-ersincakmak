import { render } from '@testing-library/react'
import React from 'react'
import DropZone from '..'

describe('Dropzone Test', () => {
  it('should render Dropzone component', () => {
    const { baseElement } = render(
      <DropZone onDrop={jest.fn()} maxFiles={1} accept="*" />
    )
    expect(baseElement).toBeInTheDocument()
  })
})
