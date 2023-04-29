import { IPost } from '@shared/models/IPost.js'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import User from './User.js'

@Entity('posts')
export default class Post implements IPost {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  place?: string

  @Column()
  description?: string

  @Column()
  imgUrl: string

  @ManyToOne(() => User, e => e.posts)
  user: Relation<User>

}