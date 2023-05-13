import { IUser } from './IUser.js'

export interface IPost {
  id: number
  title: string
  place?: string
  description?: string
  user: IUser
  createdAt: Date
}