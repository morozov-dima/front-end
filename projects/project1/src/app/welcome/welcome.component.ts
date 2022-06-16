import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    


    this.dataService.data.subscribe({
      next: (value) => {
        console.log(value);
        
      }
    });
  }

}
