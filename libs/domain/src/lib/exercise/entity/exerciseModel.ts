interface ExerciseProps {
  userId: number;
  content: Content;
  created_at: Date;
}
interface IExerciseModel {
  id?: string;
  userId: number;
  content: string;
  created_at: Date;
}
