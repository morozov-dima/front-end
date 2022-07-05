
// *************************************************************************
// ******************************** Example  *******************************
// *************************************************************************



// ************************ color.directive.spec.ts *********************
import { ColorDirective } from './color.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {By} from "@angular/platform-browser";

@Component({
  template: `
    <p appColor="yellow">text 1</p>
    <p appColor>text 2</p>
  `
})
class HostComponent {}

describe('ColorDirective', () => {
  let fixture: ComponentFixture<HostComponent>



  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorDirective, HostComponent ]
    })

    fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
  });



  it('should create an instance', () => {
    const directive = new ColorDirective(null);
    expect(directive).toBeTruthy();
  });




  it('should apply input color', () => {
    let de = fixture.debugElement.queryAll(By.css('p'))[0];

    expect(de.nativeElement.style.backgroundColor).toBe('yellow');
  });




  it('should apply default color', () => {
    let de = fixture.debugElement.queryAll(By.css('p'))[1];
    let directive = de.injector.get(ColorDirective);

    expect(de.nativeElement.style.backgroundColor).toBe(directive.defaultColor);
  });


});










// ************************ color.directive.ts *********************
import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnChanges {

  defaultColor = 'red'
  @Input('appColor') color!: string

  constructor(private el: ElementRef | null) { }

  ngOnChanges(): void {
    if(this.el) {
      this.el.nativeElement.style.backgroundColor = this.color || this.defaultColor
    }
  }

}
