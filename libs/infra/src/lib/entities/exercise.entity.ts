import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExerciseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'userId' })
  userId!: number;

  @Column('text')
  content!: string;

  @Column({ name: 'created_at' })
  created_at!: Date;
}
