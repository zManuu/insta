import { IPost } from './models/IPost'
import { IUser } from './models/IUser'

type Nullable<T> = T | undefined

type SearchResult = IPost | IUser

export {
  Nullable,
  SearchResult
}