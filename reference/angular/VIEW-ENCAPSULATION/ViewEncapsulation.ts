
// ************************************************************************
// ******************************* Example ********************************
// ************************************************************************

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello World!</h1>
    <span class="red">Shadow DOM Rocks!</span>
  `,
  styles: [`
    :host {
      display: block;
      border: 1px solid black;
    }
    h1 {
      color: blue;
    }
    .red {
      background-color: red;
    }

  `],

  // styles for this component will be applied globally.
  //
  // Emulated - this is default. with default ViewEncapsulation elements of
  // this component will be create with __ngcontent-iqq-c42 attributes.
  // <div __ngcontent-iqq-c42 class="panel">some text</div>
  //
  encapsulation: ViewEncapsulation.None 
})
class MyApp {
}