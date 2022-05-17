
// exprted from 'CommonModule'

{{ value_expression | titlecase }}


<p>{{'some string' | titlecase}}</p> <!-- output is expected to be "Some String" -->

<p>{{'tHIs is mIXeD CaSe' | titlecase}}</p> <!-- output is expected to be "This Is Mixed Case" -->

<p>{{'it\\'s non-trivial question' | titlecase}}</p> <!-- output is expected to be "It's Non-trivial Question" -->

<p>{{'one,two,three' | titlecase}}</p> <!-- output is expected to be "One,two,three" -->

<p>{{'true|false' | titlecase}}</p> <!-- output is expected to be "True|false" -->

<p>{{'foo-vs-bar' | titlecase}}</p> <!-- output is expected to be "Foo-vs-bar" -->