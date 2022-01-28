import { fireEvent, render } from '@testing-library/react'
import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import TextField from '..'

const TestComponent: React.FC = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      test: '',
    },

    onSubmit: jest.fn(),
  })

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>{children}</form>
    </FormikProvider>
  )
}

describe('Text Field', () => {
  it('should render input correctly', () => {
    const { getByTestId } = render(
      <TestComponent>
        <TextField label="Test" name="test" type="text" />
      </TestComponent>
    )
    expect(getByTestId('input')).toBeInTheDocument()
  })

  it('should render textarea correctly', () => {
    const { getByTestId } = render(
      <TestComponent>
        <TextField label="Test" name="test" type="textarea" />
      </TestComponent>
    )
    expect(getByTestId('textarea')).toBeInTheDocument()
  })

  it('should type correctly', () => {
    const { getByRole } = render(
      <TestComponent>
        <TextField label="Test" name="test" type="text" />
      </TestComponent>
    )
    fireEvent.change(getByRole('textbox'), {
      target: {
        value: 'Test Test Test',
      },
    })
    expect((getByRole('textbox') as HTMLInputElement).value).toBe(
      'Test Test Test'
    )
  })
})
