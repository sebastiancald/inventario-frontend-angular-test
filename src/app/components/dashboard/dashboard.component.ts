import { Component, OnInit } from '@angular/core';
import { MercanciaService } from '../../services/mercancia.service';
import { UsuarioService } from '../../services/usuario.service';
import { CargoService } from '../../services/cargo.service';
import { Mercancia } from '../../models/mercancia.model';
import { Usuario } from '../../models/usuario.model';
import { Cargo } from '../../models/cargo.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mercancias: Mercancia[] = [];
  usuarios: Usuario[] = [];
  cargos: Cargo[] = [];
  totalMercancias = 0;
  totalStock = 0;
  totalUsuarios = 0;
  totalCargos = 0;
  loading = false;
  error = '';

  constructor(
    private mercanciaService: MercanciaService,
    private usuarioService: UsuarioService,
    private cargoService: CargoService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    this.mercanciaService.getMercancias().subscribe({
      next: (data) => {
        this.mercancias = data;
        this.totalMercancias = data.length;
        this.totalStock = data.reduce((sum, mercancia) => sum + mercancia.cantidad, 0);
      },
      error: (error) => {
        console.error('Error loading mercancias:', error);
      }
    });

    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.totalUsuarios = data.length;
      },
      error: (error) => {
        console.error('Error loading usuarios:', error);
      }
    });

    this.cargoService.getCargos().subscribe({
      next: (data) => {
        this.cargos = data;
        this.totalCargos = data.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cargos:', error);
        this.loading = false;
      }
    });
  }
} 