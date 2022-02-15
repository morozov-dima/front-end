import { Injectable } from '@angular/core';
import { IndustryModel, VisitorsModel } from './user-data-model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private industryData: IndustryModel[] = [
    { industry: 'Gaming' },
    { industry: 'B2B' },
    { industry: 'Education' }
  ];

  private visitorsData: VisitorsModel[] = [
    { visitors: '0-100k' },
    { visitors: '100k-500k' },
    { visitors: '500K- 2 Milion'}
  ];


  constructor() { }


  getIndustryData() {
    return this.industryData;
  }


  getVisitorsData() {
    return this.visitorsData;
  }

}
