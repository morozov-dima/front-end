import { Injectable } from '@angular/core';
import { UsedData } from './used-data';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {


  userData: UsedData[] = [
    {
      userId: 101,
      userName: 'Dim123',
      shortText: 'Lorem Ipsum is simply dummy text of the printing text 1',
      LongText: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing text 1',
      imagePath: 'https://via.placeholder.com/400x200/4f4f4f'
    },
    {
      userId: 202,
      userName: 'Krus3',
      shortText: 'Lorem Ipsum is simply dummy text of the printing text 2',
      LongText: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing text 2',
      imagePath: 'https://via.placeholder.com/400x200/c1c1c1'
    },
    {
      userId: 303,
      userName: 'GTT4',
      shortText: 'Lorem Ipsum is simply dummy text of the printing text 3',
      LongText: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing text 3',
      imagePath: 'https://via.placeholder.com/400x200/f444f4'
    },
    {
      userId: 303,
      userName: 'GTT4',
      shortText: 'Lorem Ipsum is simply dummy text of the printing text 2',
      LongText: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing text 2',
      imagePath: 'https://via.placeholder.com/400x200/d55556'
    }
  ];


  constructor() { }
}
