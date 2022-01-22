import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() itemsBox: string = '';

  constructor() { }

  ngOnInit(): void {
  }


}
