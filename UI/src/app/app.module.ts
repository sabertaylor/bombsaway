import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HelloApiComponent } from './hello-api/hello-api.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloApiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
