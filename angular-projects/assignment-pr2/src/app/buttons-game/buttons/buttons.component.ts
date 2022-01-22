import { Component, OnInit, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Output() buttonValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(value: string) {
    this.buttonValue.emit(value);
  }

}
