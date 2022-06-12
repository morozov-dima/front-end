// *************************************************************************
// ********************************* Example  ******************************
// *************************************************************************


// ************************* app.component.html *****************************

<p *ngIf="newItem === ''; else elseBlock">
    Please enter a value!
</p>

<ng-template #elseBlock>
    Content to render when condition is false.
</ng-template>