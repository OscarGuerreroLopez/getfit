import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class ExerciseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'userId' })
  userId!: number;

  @Column('varchar')
  @Length(10, 100)
  content!: string;

  @Column({ name: 'created_at' })
  created_at!: Date;
}
