import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomePerfilComponent } from './components/home-perfil/home-perfil.component';


const routes: Routes = [
  { path: '', 
    component: LoginComponent 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'home-perfil', 
    component: HomePerfilComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
