import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoteRoutingModule } from './remote-routing.module';
import { RemoteComponent } from './remote.component';
import { FormsModule } from '@angular/forms';
import { ViewRemoteComponent } from './view-remote/view-remote.component';
import { CreateRemoteComponent } from './create-remote/create-remote.component';
import { RemoteService } from './remote.service';


@NgModule({
  declarations: [RemoteComponent],
  imports: [
    CommonModule,
    RemoteRoutingModule,
    FormsModule,
    ViewRemoteComponent,
    CreateRemoteComponent
  ]
  ,exports: [RemoteComponent, ViewRemoteComponent, CreateRemoteComponent]
  ,providers: [RemoteService]
})
export class RemoteModule { }
