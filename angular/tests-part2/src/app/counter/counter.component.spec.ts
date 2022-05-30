import { TestBed } from "@angular/core/testing";

import {CounterComponent} from "./counter.component";

describe('CounterComponent', () => {
  let component: CounterComponent

  beforeEach(() => {
    // this was we configure our testing module.
    TestBed.configureTestingModule({
      declarations: [CounterComponent]
    });

    // 1. we will create our component.
    // 2. here we will use 'createComponent' method.
    TestBed.createComponent(CounterComponent);



  })

})
