import { Component, OnInit } from '@angular/core';
import { MercanciaService } from '../../../services/mercancia.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Mercancia, MercanciaFiltro } from '../../../models/mercancia.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-mercancia-list',
  templateUrl: './mercancia-list.component.html',
  styleUrls: ['./mercancia-list.component.css']
})
export class MercanciaListComponent implements OnInit {
  mercancias: Mercancia[] = [];
  usuarios: Usuario[] = [];
  loading = false;
  error = '';
  filtro: MercanciaFiltro = {};
  mostrarFiltros = false;
  mostrarModalEliminar = false;
  mercanciaAEliminar: Mercancia | null = null;
  usuarioSeleccionado: number | null = null;

  constructor(
    private mercanciaService: MercanciaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.loadMercancias();
    this.loadUsuarios();
  }

  loadMercancias(): void {
    this.loading = true;
    this.mercanciaService.getMercancias().subscribe({
      next: (data) => {
        this.mercancias = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error loading mercancias:', error);
      }
    });
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error loading usuarios:', error);
        this.error = error;
      }
    });
  }

  aplicarFiltros(): void {
    this.loading = true;
    this.mercanciaService.getMercanciasByFiltros(this.filtro).subscribe({
      next: (data) => {
        this.mercancias = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error applying filters:', error);
      }
    });
  }

  limpiarFiltros(): void {
    this.filtro = {};
    this.loadMercancias();
  }

  solicitarEliminacion(mercancia: Mercancia): void {
    this.mercanciaAEliminar = mercancia;
    this.usuarioSeleccionado = null;
    this.mostrarModalEliminar = true;
    console.log('Mercancía a eliminar:', mercancia);
    console.log('Usuario que registró:', mercancia.usuarioRegistro);
  }

  confirmarEliminacion(): void {
    if (!this.mercanciaAEliminar || !this.usuarioSeleccionado) {
      this.error = 'Debe seleccionar un usuario para eliminar la mercancía';
      return;
    }

    console.log('Usuario seleccionado:', this.usuarioSeleccionado, typeof this.usuarioSeleccionado);
    console.log('Usuario que registró:', this.mercanciaAEliminar.usuarioRegistro?.id, typeof this.mercanciaAEliminar.usuarioRegistro?.id);

     if (this.mercanciaAEliminar.usuarioRegistro?.id !== +this.usuarioSeleccionado) {
      this.error = 'Solo el usuario que registró la mercancía puede eliminarla';
      this.mostrarModalEliminar = false;
      return;
    }

    this.loading = true;
    this.error = '';
    this.mercanciaService.deleteMercancia(this.mercanciaAEliminar.id!, +this.usuarioSeleccionado).subscribe({
      next: () => {
        this.loadMercancias();
        this.mostrarModalEliminar = false;
        this.mercanciaAEliminar = null;
        this.usuarioSeleccionado = null;
        this.error = '';
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error deleting mercancia:', error);
      }
    });
  }

  cancelarEliminacion(): void {
    this.mostrarModalEliminar = false;
    this.mercanciaAEliminar = null;
    this.usuarioSeleccionado = null;
    this.error = '';
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }
} 