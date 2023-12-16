import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PacienteDetallesComponent } from './paciente-detalles/paciente-detalles.component';

const routes: Routes = [
  { path: 'home', component:  HomeComponent},
  { path: '', component:  LoginComponent},
  { path: 'paciente/:id', component: PacienteDetallesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
