import { IUser } from '@shared/models/IUser.js'
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
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

  @Column()
  likeCount: number

  @Column()
  followerCount: number

  @Column()
  followedCount: number

  @OneToMany(() => Post, e => e.user)
  posts: Relation<Post[]>

  @JoinTable()
  @ManyToMany(() => User, { cascade: true })
  followers: User[]

  @JoinTable()
  @ManyToMany(() => User, { cascade: true })
  followed: User[]

}