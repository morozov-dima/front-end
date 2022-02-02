import { Component, OnInit } from '@angular/core';
import { LocalCounterService } from '../shared/counter/local-counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [LocalCounterService]
})
export class CounterComponent implements OnInit {

  constructor(private localCounterService: LocalCounterService) { }

  ngOnInit(): void {
  }

}
