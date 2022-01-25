import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //numbers: number[] = [1, 2, 3, 4, 5];
  oddNumbers: number[] = [1, 3, 5];
  evenNumber: number[] = [2, 4];
  onlyOdd: boolean = false;
  value: number = 100;
 
  randomNumber: number = Math.floor(Math.random() * 5); // expected output: 0, 1 , 2 , 3 or 4





}
