import { IUser } from '@shared/models/IUser.js'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import Post from './Post.js'

@Entity('users')
export default class User implements IUser {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  displayName: string

  @Column()
  uniqueName: string

  @Column()
  password: string

  @Column()
  description?: string

  @Column()
  avatarUrl?: string

  @OneToMany(() => Post, e => e.user)
  posts: Relation<Post[]>

}