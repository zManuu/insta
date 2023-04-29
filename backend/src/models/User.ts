import { IUser } from '@shared/models/IUser.js'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

}