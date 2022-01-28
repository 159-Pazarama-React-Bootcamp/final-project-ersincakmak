import { IAnswer, IApplication, IStatus } from '../types/application'

export const ApplicationMock: IApplication = {
  _id: '123456789',
  address: 'Address Test',
  age: 25,
  answers: [],
  files: [],
  applicationReason: 'Application Reason Test',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  firstName: 'First Name Test',
  lastName: 'Last Name Test',
  status: 'waiting',
  tcNo: 'Tc No Test',
}

export const ApplicationMockWithStatus = (status: IStatus): IApplication => ({
  ...ApplicationMock,
  status,
})

export const ApplicationMockWithAnswer = (answer: IAnswer): IApplication => ({
  ...ApplicationMock,
  answers: [{ ...answer }],
})

export const ApplicationMockWithFiles = (files: string[]): IApplication => ({
  ...ApplicationMock,
  files,
})
