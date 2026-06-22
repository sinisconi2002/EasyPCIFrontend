import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthGuard } from './services/authGuard.service';

const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'navigation', component: NavigationComponent,
      children: [
        {
          path: 'cards',
          loadChildren: () => import('./components/card/card.module').then((m)=>m.CardModule),
          // canActivate: [AuthGuard]
        },
        {
          path: 'remotes',
          loadChildren: () => import('./components/remote/remote.module').then((m)=>m.RemoteModule),
          //canActivate: [AuthGuard]
        },
        {
          path: 'test-cases',
          loadChildren: () => import('./components/testcase/testcase.module').then((m)=>m.TestcaseModule),
          //canActivate: [AuthGuard]
        },
        {
          path: 'tests',
          loadChildren: () => import('./components/test/test.module').then((m)=>m.TestModule),
          //canActivate: [AuthGuard]
        }
      ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
