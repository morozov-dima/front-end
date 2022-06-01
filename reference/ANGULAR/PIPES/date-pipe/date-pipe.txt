
// ******************* app.component.html ********************

<p>
  {{ dateObj | date }}   <!--  output is 'Jun 15, 2015' -->
</p>

<p>
  {{ dateObj | date:'medium' }}   <!--  output is 'Jun 15, 2015, 9:43:11 PM' -->
</p>

<p>
  {{ dateObj | date:'shortTime' }}   <!-- output is '9:43 PM' -->
</p>

<p>
  {{ dateObj | date:'mm:ss' }}      <!--  output is '43:11' -->
</p>








// *******************app.component.ts ********************

export class AppComponent {
  dateObj: number = Date.now();
}