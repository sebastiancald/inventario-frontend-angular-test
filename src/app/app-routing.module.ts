import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MercanciaListComponent } from './components/mercancia/mercancia-list/mercancia-list.component';
import { MercanciaFormComponent } from './components/mercancia/mercancia-form/mercancia-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoFormComponent } from './components/cargo/cargo-form/cargo-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mercancias', component: MercanciaListComponent },
  { path: 'mercancias/nueva', component: MercanciaFormComponent },
  { path: 'mercancias/editar/:id', component: MercanciaFormComponent },
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
  { path: 'cargos', component: CargoListComponent },
  { path: 'cargos/nuevo', component: CargoFormComponent },
  { path: 'cargos/editar/:id', component: CargoFormComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
