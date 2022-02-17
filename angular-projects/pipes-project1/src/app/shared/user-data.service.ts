import { Injectable } from '@angular/core';
import { UserDataPromotions } from './user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userPromotions: UserDataPromotions[] = [
    {
      title: 'Special title treatment 1',
      text: 'With supporting text below as a natural lead-in to additional content. 1'
    },
    {
      title: 'Special title treatment 2',
      text: 'With supporting text below as a natural lead-in to additional content. 2'
    },
    {
      title: 'Special title treatment 3',
      text: 'With supporting text below as a natural lead-in to additional content. 3'
    },
    {
      title: 'Special title treatment 4',
      text: 'With supporting text below as a natural lead-in to additional content. 4'
    },
    {
      title: 'Special title treatment 5',
      text: 'With supporting text below as a natural lead-in to additional content. 5'
    },
    {
      title: 'Special title treatment 6',
      text: 'With supporting text below as a natural lead-in to additional content. 6'
    }
  ];

  constructor() { }


  getUserPromotions() {
    return this.userPromotions;
  }

}
