import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../../services/cargo.service';
import { Cargo } from '../../../models/cargo.model';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css']
})
export class CargoListComponent implements OnInit {
  cargos: Cargo[] = [];
  loading = false;
  error = '';

  constructor(private cargoService: CargoService) { }

  ngOnInit(): void {
    this.loadCargos();
  }

  loadCargos(): void {
    this.loading = true;
    this.cargoService.getCargos().subscribe({
      next: (data) => {
        this.cargos = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error loading cargos:', error);
      }
    });
  }

  deleteCargo(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este cargo?')) {
      this.error = '';
      this.cargoService.deleteCargo(id).subscribe({
        next: () => {
          this.loadCargos();
        },
        error: (error) => {
          this.error = error;
          console.error('Error deleting cargo:', error);
        }
      });
    }
  }
} 