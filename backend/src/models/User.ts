import { IUser } from '@shared/models/IUser.js'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import Post from './Post.js'
import Message from './Message.js'
import { IMessage } from '@shared/models/IMessage.js'

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
  followers: Relation<User[]>

  @JoinTable()
  @ManyToMany(() => User, { cascade: true })
  followed: Relation<User[]>

  @OneToMany(() => Message, e => e.to)
  receivedMessages: Relation<Message[]>

  @OneToMany(() => Message, e => e.from)
  sentMessages: Relation<Message[]>

}