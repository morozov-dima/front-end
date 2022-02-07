import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UsedDataService } from '../shared/used-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  pageType:string = 'hp';

  constructor(private usedDataService: UsedDataService,
              private router: Router) { }

  ngOnInit(): void {
    this.usedDataService.getPageTests(this.pageType);
  }
  



  goToHelpSection() {
    const navigationExtras: NavigationExtras = {
      fragment: 'help'
    };
    this.router.navigate(['/promotions'], navigationExtras);
  }

}
