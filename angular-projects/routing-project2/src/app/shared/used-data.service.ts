import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UsedDataService {
  data: UserModel[] = [
    {
      text: 'some text for home page',
      pageType: 'hp'
    },
    {
      text: 'some text for promotions page',
      pageType: 'promotions'
    },
    {
      text: 'some text for games page',
      pageType: 'games'
    }
  ];

  constructor() { }


  getPageTests(pageType: string): string {
    const result = this.data.find(item => item.pageType === pageType);
    return result!.text;
  }


}
