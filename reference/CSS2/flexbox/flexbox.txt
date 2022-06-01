

// ******************************************************************
// **************************** Example 1 ***************************
// ******************************************************************

//  ----------------------------------------------------------------
//  -                                                              -
//  -                -------------------------                     -
//  -                -       Top Block       -                     -
//  -                -------------------------                     -
//  -                -      Bottom Block     -                     -
//  -                -------------------------                     -
//  -                                                              -
//  ----------------------------------------------------------------


// ******************** app.component.html **********************
<section class="content-template">
  <div class="content-internal-template">
      <div class="top-block">
          <div>
            Top Block
          </div>
      </div>
      <div class="bottom-block">
          <div>
            Bottom Block
          </div>  
      </div>
  </div>
</section>



// ******************** app.component.css **********************
.content-template {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.content-internal-template {
    display: flex;
    text-align: center;
    flex-direction: column;
    border: 1px solid #9a9a9a;
    width: 960px;
}

.top-block {
    padding: 10px;
    border: 1px solid #9a9a9a;
}

.bottom-block {
    padding: 10px;
    border: 1px solid #9a9a9a;
}













// ******************************************************************
// **************************** Example 2 ***************************
// ******************************************************************

//  ------------------------------------------------------------------
//  -                                                                -
//  -     -------------------------   -------------------------      -
//  -     -       Left Block      -   -    Right Block        -      -
//  -     -------------------------   -------------------------      -
//  -                                                                -
//  ------------------------------------------------------------------




// ******************** app.component.html **********************
<section class="content-template">
  <div class="content-internal-template">
      <div class="top-block">
          <div>
            Left Block
          </div>
      </div>
      <div class="bottom-block">
          <div>
            Right Block
          </div>  
      </div>
  </div>
</section>



// ******************** app.component.css **********************
.content-template {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.content-internal-template {
    display: flex;
    text-align: center;
    flex-direction: row;
    border: 1px solid #9a9a9a;
    width: 960px;
}

.top-block {
    padding: 10px;
    border: 1px solid #9a9a9a;
    width: 50%;
}

.bottom-block {
    padding: 10px;
    border: 1px solid #9a9a9a;
    width: 50%;
}