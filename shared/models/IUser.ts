import { IPost } from './IPost.js'

export interface IUser {
  id: number
  displayName: string
  uniqueName: string
  password: string
  description?: string
  avatarUrl?: string
  followerCount: number
  likeCount: number
  posts: IPost[]
}