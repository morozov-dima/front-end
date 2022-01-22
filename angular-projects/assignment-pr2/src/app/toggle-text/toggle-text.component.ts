import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-text',
  templateUrl: './toggle-text.component.html',
  styleUrls: ['./toggle-text.component.css']
})
export class ToggleTextComponent implements OnInit {
  showText: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
