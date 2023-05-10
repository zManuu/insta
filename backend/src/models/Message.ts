import { IMessage } from '@shared/models/IMessage.js'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import User from './User.js'

@Entity('messages')
export default class Message implements IMessage {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: ['text', 'share'] })
  type: 'text' | 'share'

  @Column()
  content: string

  @JoinColumn()
  @ManyToOne(() => User)
  from: Relation<User>

  @JoinColumn()
  @ManyToOne(() => User)
  to: Relation<User>

}