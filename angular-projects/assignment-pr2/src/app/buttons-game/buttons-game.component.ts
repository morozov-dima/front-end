import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons-game',
  templateUrl: './buttons-game.component.html',
  styleUrls: ['./buttons-game.component.css']
})
export class ButtonsGameComponent implements OnInit {
  buttonName: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  addItem(newItem: string) {
    this.buttonName = newItem;
  }

}
