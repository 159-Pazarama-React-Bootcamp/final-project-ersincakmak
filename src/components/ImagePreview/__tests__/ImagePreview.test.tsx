import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import ImagePreview from '..'

const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' })

describe('Image Preview Test', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn()
  })

  it('should render correctly', () => {
    const { baseElement } = render(
      <ImagePreview file={mockFile} onDelete={false} />
    )
    expect(baseElement).toBeInTheDocument()
  })

  it('toggle modal correctly', () => {
    const { getByRole, getByTestId, queryByTestId } = render(
      <ImagePreview file={mockFile} onDelete={false} />
    )
    fireEvent.click(getByTestId('image-modal-text'))
    expect(queryByTestId('image-modal')).toBeInTheDocument()
    fireEvent.click(getByRole('button'))
    expect(queryByTestId('image-modal')).not.toBeInTheDocument()
  })

  it('should call onDelete function correctly', () => {
    const deleteFunc = jest.fn()
    const { getByTestId } = render(
      <ImagePreview file={mockFile} onDelete={deleteFunc} />
    )
    fireEvent.click(getByTestId('delete-button'))
    expect(deleteFunc).toBeCalledTimes(1)
  })
})
