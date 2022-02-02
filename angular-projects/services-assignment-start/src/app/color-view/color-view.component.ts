import { Component, OnInit } from '@angular/core';
import { ManageColorsService } from '../shared/manage-colors.service';

@Component({
  selector: 'app-color-view',
  templateUrl: './color-view.component.html',
  styleUrls: ['./color-view.component.css']
})
export class ColorViewComponent implements OnInit {
  currentColor: string = '';

  constructor(private manageColorsService: ManageColorsService) { }

  ngOnInit(): void {
    this.manageColorsService.getColor.subscribe((color: string) => {
      this.currentColor = color;
    });
  }

}
