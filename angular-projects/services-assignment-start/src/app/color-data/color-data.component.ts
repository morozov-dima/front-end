import { 
  Component, 
  OnInit, 
  AfterViewInit
 } from '@angular/core';

import { ManageColorsService } from '../shared/manage-colors.service';

@Component({
  selector: 'app-color-data',
  templateUrl: './color-data.component.html',
  styleUrls: ['./color-data.component.css']
})
export class ColorDataComponent implements OnInit, AfterViewInit {
  color1: string = 'red';
  color2: string = 'blue';
  color3: string = 'green';

  showColor: string = '';


  constructor(private manageColorsService: ManageColorsService) { }


  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
  }

    
  onGetColor(color: string) {
    this.showColor = color;
   
    this.manageColorsService.getColor.emit(color);
  }  
  

}
