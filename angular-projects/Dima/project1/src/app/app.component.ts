import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private renderer:Renderer2) {}
  text: string = '';
  texts: string[] = [];

  result: string = '';
  highlights: any[] = [];

  @ViewChild('hello', { static: false }) divHello!: ElementRef;
  
  ngOnInit(): void {
      this.text = 'MyName Dima Morozovfffffffffffffffffffff';

  }




  ngAfterViewInit(): void {
    this.highlights = [
      {
          from: 6,
          to: 11
      },
      {
          from: 20,
          to: 30
      }
    ];

 

    for (const highlight of this.highlights) {
      this.addBold(this.text, highlight.from, highlight.to);
    }


  }



  addBold(message: string, from: number, to: number) {
    console.log(this.divHello.nativeElement);
    
    const stringBefore = message.substring(0, from);
    const stringBeforeElement = this.renderer.createText(stringBefore);
    console.log(stringBeforeElement);
    


    let subStr = message.substring(from, to);
    const spanElement = this.renderer.createElement('span');
    this.renderer.addClass(spanElement, 'redColor');
    const subTextElement = this.renderer.createText(subStr);
    console.log(subTextElement);
    
    this.renderer.appendChild(spanElement, subTextElement);

    
    const stringafter = message.substring(to);
    const stringafterElement = this.renderer.createText(stringafter);
    console.log(stringafterElement);
    

     this.renderer.appendChild(this.divHello.nativeElement, stringBeforeElement);
     this.renderer.appendChild(this.divHello.nativeElement, spanElement);
     this.renderer.appendChild(this.divHello.nativeElement, stringafterElement);
     return spanElement;
  }


}
