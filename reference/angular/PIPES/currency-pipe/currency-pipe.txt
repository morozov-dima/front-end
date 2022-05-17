@Component({
  selector: 'currency-pipe',
  template: `<div>
    <!--output '$0.26'-->
    <p>A: {{a | currency}}</p>
  </div>`
})
export class CurrencyPipeComponent {
  a: number = 0.259;
}