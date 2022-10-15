import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  username!: string;

  @Column('text')
  password!: string;
}
