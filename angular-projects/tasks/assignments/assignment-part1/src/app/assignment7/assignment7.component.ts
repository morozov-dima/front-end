import { Component, OnInit } from '@angular/core';
import { delay, take } from 'rxjs';
import { UserDataService } from './user-data.service';

@Component({
  selector: 'app-assignment7',
  templateUrl: './assignment7.component.html',
  styleUrls: ['./assignment7.component.css']
})
export class Assignment7Component implements OnInit {

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {

    // start emit user data
    this.userDataService.startEmitUserData();

    // listen to the emits
    this.userDataService.subjectTodos
    .subscribe({
      next: (response) => {
        console.log(response);

      }
    });

  }

}
