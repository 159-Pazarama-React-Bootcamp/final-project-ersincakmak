export interface IApplication {
  firstName: string
  lastName: string
  age: number
  tcNo: string
  address: string
  applicationReason: string
  files: string[]
  answers: IAnswer[]
  status: IStatus
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IAnswer {
  _id: string
  message: string
  author: {
    username: string
    name: string
  }
}

export interface ICreateApplicationPayload {
  firstName: string
  lastName: string
  age: number | ''
  tcNo: string
  address: string
  applicationReason: string
  files: File[]
}

export interface IApplicationState {
  application: IApplication | null
  message: string
}

export type IStatus = 'waiting' | 'rejected' | 'solved'
