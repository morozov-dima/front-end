import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { NumbersService } from '../events.service';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit, OnDestroy {
  evenNumber!: number;
  eventNumberSub!: Subscription;

  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {

   this.eventNumberSub = this.numbersService.counterEvents
    .pipe(
      // pass only event numbers
      filter((number) => { 
          return number % 2 === 0
        }
      )
    )
    .subscribe({
      next: (number) => {
          this.evenNumber = number;
      }
    });
  }


  ngOnDestroy(): void {
    this.eventNumberSub.unsubscribe();
  }

}
