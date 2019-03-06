import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  exports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatIconModule

  ]
})
export class MaterialModule { }
