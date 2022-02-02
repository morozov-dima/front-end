import { Component, Input, OnInit } from '@angular/core';
import { CounterService } from '../shared/counter.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-inactive-users-di',
  templateUrl: './inactive-users-di.component.html',
  styleUrls: ['./inactive-users-di.component.css']
})
export class InactiveUsersDiComponent implements OnInit {
  usersDI: string[];
  constructor(private usersService: UsersService, private counterService: CounterService) { }

  ngOnInit(): void {
    this.usersDI = this.usersService.inactiveUsersDI;
  }

  onSetToActiveDI(id: number) {
    this.usersService.onSetToActiveDI(id);
  }   


}
