import { IUser } from './IUser.js'

export interface IMessage {
  id: number
  from: IUser
  to: IUser
  type: 'text' | 'share'
  content: string
}