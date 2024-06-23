import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card.component';
import { ViewCardComponent } from './view-card/view-card.component';
import { CreateCardComponent } from './create-card/create-card.component';

const routes: Routes = [{path: '', component: CardComponent},
                        {path: 'create-card', component: CreateCardComponent},
                        {path: ':id', component: ViewCardComponent}                        
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CardRoutingModule { }
