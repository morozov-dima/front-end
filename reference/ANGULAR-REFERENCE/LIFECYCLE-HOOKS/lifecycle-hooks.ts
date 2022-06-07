// *************************************************************************
// ********************************** Example ******************************
// *************************************************************************


ngOnChanges()
Called before ngOnInit() (if the component has bound inputs) and
whenever one or more data-bound input properties change.






ngOnInit()
Called once, after the first ngOnChanges(). ngOnInit()
is still called even when ngOnChanges() is not
(which is the case when there are no template-bound inputs).






ngDoCheck()
Called immediately after ngOnChanges() on every change detection run,
and immediately after ngOnInit() on the first run.






ngAfterContentInit()
Called once after the first ngDoCheck()






ngAfterContentChecked()
Called after ngAfterContentInit() and every
subsequent ngDoCheck().






ngAfterViewInit()
Called once after the first ngAfterContentChecked().
Respond after Angular checks the component's views and child views, or the view that contains the directive.








ngAfterViewChecked()
Called after the ngAfterViewInit() and every
subsequent ngAfterContentChecked().





ngOnDestroy()
Called immediately before Angular destroys the
directive or component.


