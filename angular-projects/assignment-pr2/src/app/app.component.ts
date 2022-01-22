import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: string[] = [];

  addItem(newItem: string){
    this.items.push(newItem);
  }



}
