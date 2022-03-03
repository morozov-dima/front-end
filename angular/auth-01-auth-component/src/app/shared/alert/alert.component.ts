import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent {
    // this string should be settable from outside. we will add @Input() decarator
    @Input() message: string;

    @Output() close = new EventEmitter<void>();

    onClose() {
        // here we emit our event.
        this.close.emit();
    }



}