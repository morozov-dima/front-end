import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  /* we add alias here */
  @Output('bpCreated') bluePrintCreared = new EventEmitter<{serverName: string, serverContent: string}>();

  //newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContentInput') serverContentInput:ElementRef;
  constructor() { }

  ngOnInit(): void {

    
  }

  onAddServer(nameInput: HTMLInputElement) {
    console.log(this.serverContentInput);
    this.serverCreated.emit({
      serverName: nameInput.value,  /* here we use local reference */
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.bluePrintCreared.emit({
      serverName: nameInput.value,  /* here we use local reference */
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

}
