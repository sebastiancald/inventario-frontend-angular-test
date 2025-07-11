import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MercanciaListComponent } from './components/mercancia/mercancia-list/mercancia-list.component';
import { MercanciaFormComponent } from './components/mercancia/mercancia-form/mercancia-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { CargoListComponent } from './components/cargo/cargo-list/cargo-list.component';
import { CargoFormComponent } from './components/cargo/cargo-form/cargo-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MercanciaListComponent,
    MercanciaFormComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    CargoListComponent,
    CargoFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
