import { Subject } from 'rxjs';

import { Exercise } from './exercise.model';

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private runningExercise: any;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    // the slice() method will crate a real copy of that array
    // new array will be created without affecting the old one.
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    // we send data with next (we use copy of our object)
    // we send 'this.runningExercise' to our Subject
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    // here we push new object, where we copy existing object and
    // we add to new objet 'date', 'state' keys.
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // here we push new object, where we copy existing object and
    // we add to new objet 'date', 'state' keys.
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    // here we return a new object which simply is a copy of this
    // running exercise.
    return { ...this.runningExercise };
  }


  getCompletedOrCancelledExercises() {
    // we will return a copy of our object.
    return this.exercises.slice();
  }


}
