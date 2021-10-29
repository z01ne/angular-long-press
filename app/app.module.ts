import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LongPressDirective } from './../long-press.directive';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, LongPressDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
