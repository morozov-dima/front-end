import { Component, OnInit, EventEmitter, Output, ViewChild, TemplateRef, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Output() itemsList = new EventEmitter<string>();
  itemsListForChildComponent: string[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  onAddText(value: string) {
    this.itemsList.emit(value);
    this.itemsListForChildComponent.push(value);
  }


}
