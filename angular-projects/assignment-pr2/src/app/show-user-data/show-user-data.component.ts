import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-show-user-data',
  templateUrl: './show-user-data.component.html',
  styleUrls: ['./show-user-data.component.css']
})
export class ShowUserDataComponent implements OnInit, AfterContentChecked {
  @Input() itemsListChildComp: string[] = [];

  setColor: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterContentChecked() {
    this.setTextColor();
  }


  setTextColor() {
     this.itemsListChildComp.length > 2 ? this.setColor = 'blue' : this.setColor = 'green';
  }

}
