import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from '../../../services/cargo.service';
import { Cargo, CargoRequest } from '../../../models/cargo.model';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.css']
})
export class CargoFormComponent implements OnInit {
  cargoForm: FormGroup;
  isEditMode = false;
  cargoId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cargoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.cargoId = +id;
        this.loadCargo(this.cargoId);
      }
    });
  }

  loadCargo(id: number): void {
    this.loading = true;
    this.cargoService.getCargo(id).subscribe({
      next: (cargo) => {
        this.cargoForm.patchValue({
          nombre: cargo.nombre,
          descripcion: cargo.descripcion
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error loading cargo:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.cargoForm.valid) {
      this.loading = true;
      this.error = '';
      const cargoData: CargoRequest = this.cargoForm.value;

      if (this.isEditMode && this.cargoId) {
        this.cargoService.updateCargo(this.cargoId, cargoData).subscribe({
          next: () => {
            this.router.navigate(['/cargos']);
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            console.error('Error updating cargo:', error);
          }
        });
      } else {
        this.cargoService.createCargo(cargoData).subscribe({
          next: () => {
            this.router.navigate(['/cargos']);
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            console.error('Error creating cargo:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/cargos']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.cargoForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }
} 