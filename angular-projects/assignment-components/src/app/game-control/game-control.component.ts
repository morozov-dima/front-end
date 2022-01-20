import { 
  Component, 
  OnInit, 
  Output, 
  EventEmitter
 } from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();

  counter: number = 0;
  resultOdd: object[] = [];
  resultEven: object[] = [];
  gameInterval:any;

  constructor() { }

  ngOnInit(): void {
  }


  

  onStartGame(event: Event) {
    const interval = 1000;
     this.gameInterval =  setInterval(() => {
  
      if (this.counter % 2 === 0) {
        // save odd numbers in object
        this.resultOdd.push({'num': this.counter});
      }else{
        // save even numbers in object
        this.resultEven.push({'num': this.counter});
      }

      this.counter += 1;
     
    }, interval);
  }



  onStopGame(event: Event) {
    clearInterval(this.gameInterval);
  
  }






}



