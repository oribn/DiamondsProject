import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { DiamondsComponent } from './diamonds/diamonds.component';
import { DiamondsListComponent } from './diamonds/diamonds-list/diamonds-list.component';
import { DiamondItemComponent } from './diamonds/diamond-item/diamond-item.component';
import { DiamondsService } from './diamonds/diamonds.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DiamondsEditComponent } from './diamonds/diamonds-edit/diamonds-edit.component';

@NgModule({
    declarations: [AppComponent,
                   DiamondsComponent,
                   DiamondsListComponent,
                   DiamondItemComponent,
                   DiamondsEditComponent
    ],
    imports: [BrowserModule,
              CommonModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientModule,

    ],
    bootstrap: [AppComponent],
    providers:[DiamondsService] 
})
export class AppModule {

}