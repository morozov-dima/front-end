import { Component } from '@angular/core';
import { NumbersService } from '../events.service';
 

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent  {

  constructor(
        private numbersService: NumbersService
      ) { }

  onStartGame() {
    this.numbersService.startCounter();
  }

}
