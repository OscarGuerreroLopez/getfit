import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExerciseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  exerciseId?: string;

  @Column({ name: 'userId' })
  userId!: number;

  @Column({
    length: 100,
  })
  content!: string;

  @Column({ name: 'created_at' })
  created_at!: Date;
}
