import { render } from '@testing-library/react'
import React from 'react'
import ApplicationDetail from '..'
import {
  ApplicationMock,
  ApplicationMockWithFiles,
} from '../../../mocks/Application'

describe('ApplicationDetail test', () => {
  it('should render correctly without file', () => {
    const { getByText } = render(
      <ApplicationDetail application={ApplicationMock} />
    )
    expect(getByText(/There is no files/i)).toBeInTheDocument()
  })

  it('should render correctly with file', () => {
    const { queryByText } = render(
      <ApplicationDetail
        application={ApplicationMockWithFiles(['testFileUrl'])}
      />
    )
    expect(queryByText(/There is no files/i)).not.toBeInTheDocument()
  })
})
