export interface IApplication {
  firstName: string
  lastName: string
  age: number
  tcNo: string
  address: string
  applicationReason: string
  files: string[]
  answers: any[] // todo
  status: IStatus
  _id: string
}

export interface ICreateApplicationPayload {
  firstName: string
  lastName: string
  age: number
  tcNo: string
  address: string
  applicationReason: string
  files: File[]
}

export interface IApplicationState {
  application: IApplication
  message: string
}

export type IStatus = 'waiting' | 'rejected' | 'solved'
