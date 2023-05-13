import { IPost } from '@shared/models/IPost.js'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
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

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, e => e.posts)
  user: Relation<User>

}