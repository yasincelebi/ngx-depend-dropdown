import { NgModule } from '@angular/core';
import { NgxDependDropdownComponent } from './ngx-depend-dropdown.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import { NgxDependDropdownNodeComponent } from './ngx-depend-dropdown-node/ngx-depend-dropdown-node.component';



@NgModule({
  declarations: [
    NgxDependDropdownComponent,
    NgxDependDropdownNodeComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule
  ],
  exports: [
    NgxDependDropdownComponent
  ]
})
export class NgxDependDropdownModule { }
