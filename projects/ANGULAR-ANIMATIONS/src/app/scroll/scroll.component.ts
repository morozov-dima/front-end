import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';



@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
  animations: [


    trigger('openClose', [
      state('false', style({
        opacity: 0,
        transform: 'translateY(100%)'
      })),
      state('true', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('false => true', [
            group([
              animate('1s ease-out', style({
                opacity: 1
              })),
              animate('2s ease-out', style({
                transform: 'translateY(0)'
              }))
            ])
      ]),
    ]),


    trigger('openClose2', [
      state('false', style({
        opacity: 0,
        transform: 'translateY(100%)'
      })),
      state('true', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('false => true', [
        group([
          animate('2s ease-out', style({
            opacity: 1
          })),
          animate('2s ease-out', style({
            transform: 'translateY(0)'
          }))
        ])
      ]),
    ]),




    trigger('openClose3', [
      state('false', style({
        opacity: 0,
        transform: 'translateY(100%)'
      })),
      state('true', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('false => true', [
        group([
          animate('1s ease-out', style({
            opacity: 1
          })),
          animate('2s ease-out', style({
            transform: 'translateY(0)'
          }))
        ])
      ]),
    ])



  ]
})
export class ScrollComponent implements OnInit {

  constructor(private el:ElementRef) { }
  isShown: boolean = false;
  ngOnInit(): void {

    console.log(this.el.nativeElement.offsetTop);
    

  }
  

  @HostListener('window:scroll', ['$event']) testView() {
    if (window.scrollY >= this.el.nativeElement.offsetTop - window.innerHeight + 150) {
        console.log('user see current component !!!');
        this.isShown = true;
      }
  }

}
