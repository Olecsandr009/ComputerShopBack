import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserEntity' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ default: '' })
  firstname: string;

  @Column({ default: '' })
  sex: string;

  @Column({ default: '' })
  birthday: string;

  @Column({ default: 0 })
  phone: number;

  @Column({
    default: 'http://localhost:3000/pictures/1_1_4_4_7_6_0_1700727251024.png',
  })
  ava: string;

  @Column()
  password: string;

  @Column({ default: '' })
  live: string;

  @Column({ default: '' })
  category: string;

  @Column({ default: 'Гість' })
  status: string;
}
