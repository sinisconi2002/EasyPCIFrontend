import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';
import { FormsModule } from '@angular/forms';
import { ViewCardComponent } from './view-card/view-card.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CardService } from './card.service';


@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    CardRoutingModule,
    FormsModule,
    ViewCardComponent,
    CreateCardComponent
  ],
  exports: [CardComponent, ViewCardComponent, CreateCardComponent],
  providers: [CardService]
})
export class CardModule { }
