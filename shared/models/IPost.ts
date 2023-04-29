import { IUser } from './IUser.js'

export interface IPost {
  id: number
  title: string
  place?: string
  description?: string
  imgUrl: string
  user: IUser
}