import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, OnDestroy {
  id: number;
  private sub: Subscription;

  constructor( private route: ActivatedRoute,
               private userService: UserService ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      
      // option 2
      // this.id = +params['id'];
    });


    const intervalStream: Observable<number> = interval(1000);
    this.sub = intervalStream
    .pipe(
      filter(value => value % 2 === 0),
      map((value) => `Mapped value ${value}`)
    ).subscribe(
      (value) => {
        console.log(value);
        
      }
    );
    


  }

  onActivate() {
    //this.userService.activatedEmitter.emit(true);
    this.userService.activatedEmitter.next(true);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
