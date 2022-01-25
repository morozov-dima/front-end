import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { UnlessDirective } from './unless/unless.directive';
import { BetterHighlightRenderer2Directive } from './better-highlight/better-highlight-renderer2.directive';
import { BetterHighlightUdemuRuRenderer2Directive } from './better-highlight/better-highlight-udemu-ru-renderer2.directive';
import { BetterHighlightUdemuRuHostbindingDirective } from './better-highlight/better-highlight-udemu-ru-hostbinding.directive';
import { CircleStyleDirective } from './circle/circle-style.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    BetterHighlightRenderer2Directive,
    BetterHighlightUdemuRuRenderer2Directive,
    BetterHighlightUdemuRuHostbindingDirective,
    CircleStyleDirective,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
