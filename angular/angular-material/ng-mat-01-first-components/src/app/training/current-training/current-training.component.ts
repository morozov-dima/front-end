import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: any;
  constructor(public dialog: MatDialog, private trainingService: TrainingService) { }




  ngOnInit(): void {
    this.startOrResumeTimer();
  }





  startOrResumeTimer() {
    // here 'duration' is a key on our object
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;

    // set progress
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        // stop when we have 100%
        clearInterval(this.timer)
      }
    }, step)
  }




  onStop() {
    clearInterval(this.timer);

    // we can load our component programmatically
    // not with 'selector'
    // 'StopTrainingComponent' this is component that we
    // will open.
    const dialogRef = this.dialog.open(
      StopTrainingComponent,
       {
         data: {
          progress: this.progress
         }
      });

      // whe we press yes/no on dialog (popup)
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.trainingService.cancelExercise(this.progress);
        } else {
          this.startOrResumeTimer();
        }
        
      });
  }




}
