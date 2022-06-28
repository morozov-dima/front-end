// ************************************************************************
// ****************************** Example  ********************************
// ************************************************************************




// ************************* odd.component.ts *****************************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { NumbersService } from '../events.service';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit, OnDestroy {
  oddNumber!: number;
  oddNumberSub!: Subscription;

  constructor(private numbersService: NumbersService) { }

  ngOnInit(): void {
    this.oddNumberSub = this.numbersService.counterEvents
    .pipe(
      filter(number => number % 2 !== 0)
    )
    .subscribe((number) => {
      this.oddNumber = number;
    });
  }



}


