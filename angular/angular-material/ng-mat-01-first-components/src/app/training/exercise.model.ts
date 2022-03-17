export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date; // oprional
  state?: 'completed' | 'cancelled' | null; // optional
}
