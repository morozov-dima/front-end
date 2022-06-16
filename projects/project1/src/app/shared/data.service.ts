import { AfterViewChecked, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RandomValues } from './data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  data: Subject<RandomValues[]> = new Subject<RandomValues[]>();

  constructor() { }


  ngOnInit(): void {
    console.log(this.data);
    
  }

}
