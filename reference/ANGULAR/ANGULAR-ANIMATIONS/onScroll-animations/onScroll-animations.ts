// ***********************************************************************
// ********************************* Example *****************************
// ***********************************************************************


// *********************** animation.component.ts ***********************
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('openClose', [
      state('false', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('true', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('false => true', [
        animate('2s ease-out')
      ]),
    ]),


    trigger('openClose2', [
      state('false', style({
        opacity: 0
      })),
      state('true', style({
        opacity: 1
      })),
      transition('false => true', [
        animate('5s ease-out')
      ]),
    ]),


    trigger('openClose3', [
      state('false', style({
        opacity: 0,
        transform: 'translateX(100%)'
      })),
      state('true', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('false => true', [
        animate('2s ease-out')
      ]),
    ])


  ]
})
export class AnimationComponent implements OnInit {

  constructor(private el:ElementRef) { }
  isShown: boolean = false;
  ngOnInit(): void {}
  

  @HostListener('window:scroll', ['$event']) testView() {
    if (window.scrollY >= this.el.nativeElement.offsetTop - window.innerHeight) {
        console.log('user see current component !!!');
        this.isShown = true;
      }
  }

}









// ***************************** animation.component.html ************************
<div id="divHello" class="content">
    <div class="box1"  [@openClose]="isShown ? 'true' : 'false'">
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, maiores?
    </div>

    <div class="box2"  [@openClose2]="isShown ? 'true' : 'false'">
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, maiores?
    </div>

    <div class="box3"  [@openClose3]="isShown ? 'true' : 'false'">
        <h2>Lorem ipsum dolor sit amet.</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, maiores?
    </div>
</div>






