import { IPost } from './IPost.js'
import { IMessage } from './IMessage.js'

export interface IUser {
  id: number
  displayName: string
  uniqueName: string
  password: string
  description?: string
  avatarUrl?: string
  followerCount: number
  followedCount: number
  likeCount: number
  posts: IPost[]
  followers: IUser[]
  followed: IUser[]
  sentMessages: IMessage[]
  receivedMessages: IMessage[]
  createdAt: Date
  latestLogin: number
}