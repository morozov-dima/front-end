// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************

// https://blog.angular-university.io/angular-file-upload/
// https://www.youtube.com/watch?v=YkvqLNcJz3Y&t=627s


// **************************** app.component.ts ***************************
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event:any) {
     this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const url = 'https://api.kraken.io/v1/upload';
    const formData = new FormData();
    if(this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.http.post(url, formData).subscribe();
  }

}






// ************************** app.component.html *************************
<h1>File Upload</h1>
<input 
    style="display:none;" 
    type="file" 
    class="file-upload"
    #fileInput
    (change)="onFileSelected($event)">

<button 
    type="button"
    (click)="fileInput.click()" >
    Pick File
</button>

<button
     type="button"
     class="upload-btn"
     (click)="onUpload()" >
     Upload
</button>