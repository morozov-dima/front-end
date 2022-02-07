import { Injectable } from '@angular/core';

// import interface
import { UserDataInterface } from './user-data-interface'; 


@Injectable({
  providedIn: 'root'
})
export class UserDataService  {
  data: UserDataInterface[] = [
    { 
      text: 'Some text for home page',
      pageType: 'hp'
    },
    { 
      text: 'Some text for promotions page',
      pageType: 'promotions'
    },
    { 
      text: 'Some text for games page',
      pageType: 'games'
    }
  ];
 
  

  constructor() { }


   getPageData(pageType: string): string {
    const result = this.data.find(item => item.pageType === pageType );
    return result!.text;
   } 

}
