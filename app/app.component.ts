import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
 value=0;
 state="";
 log=console.log;
 inc(){this.value++;}
 dec(){this.value--;}
}
