import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelInputComponent } from './tel-input/tel-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TelInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
        FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public static forRoot(): ModuleWithProviders<AppModule> {
    return {
        ngModule: AppModule,
        providers: []
    };
}
}
