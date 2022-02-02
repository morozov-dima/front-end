import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  activeUsersDI: string[] = ['Yuli', 'Max'];
  inactiveUsersDI: string [] = ['Dima', 'Sveta'];


  constructor(private counterService: CounterService) { }


  onSetToInactiveDI(id: number) {
    this.inactiveUsersDI.push(this.activeUsersDI[id]);
    this.activeUsersDI.splice(id, 1);
    this.counterService.countActiveUsers();
  }

  onSetToActiveDI(id: number) {
    this.activeUsersDI.push(this.inactiveUsersDI[id]);
    this.inactiveUsersDI.splice(id, 1);
    this.counterService.countInactiveUsers();
  }


}
