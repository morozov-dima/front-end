import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  closeResult = '';
  active = 1;


  constructor(
    private offcanvasService: NgbOffcanvas,
    public route: ActivatedRoute
    ) {}

  ngOnInit(): void {
  }


  open(content: any) {
    this.offcanvasService.open(content);
  }


}
