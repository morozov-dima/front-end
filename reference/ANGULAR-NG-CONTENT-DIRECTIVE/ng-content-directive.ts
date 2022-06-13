// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************



// ************************** app.component.html ***************************
<app-welcome>
  <!-- this html will be passed to child component - begin -->
  <div [ngStyle]="{'background-color': 'black', 'color': 'white'}">
    <h2>Title</h2>
    <div>Description ...</div>
  </div>
  <!-- this html will be passed to child component - end -->
</app-welcome>





// ************************ welcome.component.html *************************
<ng-content>
    <!-- here will be text from out parent component -->
</ng-content>