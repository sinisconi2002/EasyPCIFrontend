import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteComponent } from './remote.component';
import { CreateRemoteComponent } from './create-remote/create-remote.component';
import { ViewRemoteComponent } from './view-remote/view-remote.component';

const routes: Routes = [{path: '', component: RemoteComponent},
                        {path: 'create-remote', component: CreateRemoteComponent},
                        {path: ':id', component: ViewRemoteComponent}   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteRoutingModule { }
