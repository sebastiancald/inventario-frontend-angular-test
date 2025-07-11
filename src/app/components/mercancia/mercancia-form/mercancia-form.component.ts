import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MercanciaService } from '../../../services/mercancia.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Mercancia, MercanciaRequest } from '../../../models/mercancia.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-mercancia-form',
  templateUrl: './mercancia-form.component.html',
  styleUrls: ['./mercancia-form.component.css']
})
export class MercanciaFormComponent implements OnInit {
  mercanciaForm: FormGroup;
  isEditMode = false;
  mercanciaId: number | null = null;
  loading = false;
  error = '';
  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private mercanciaService: MercanciaService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.mercanciaForm = this.fb.group({
      nombreProducto: ['', [Validators.required, Validators.minLength(3)]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      fechaIngreso: ['', Validators.required],
      usuarioRegistroId: ['', Validators.required],
      usuarioModificacionId: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.mercanciaId = +id;
        this.loadMercancia(this.mercanciaId);
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

  loadMercancia(id: number): void {
    this.loading = true;
    this.mercanciaService.getMercancia(id).subscribe({
      next: (mercancia) => {
        this.mercanciaForm.patchValue({
          nombreProducto: mercancia.nombreProducto,
          cantidad: mercancia.cantidad,
          fechaIngreso: mercancia.fechaIngreso,
          usuarioRegistroId: mercancia.usuarioRegistro?.id || '',
          usuarioModificacionId: mercancia.usuarioModificacion?.id || ''
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error loading mercancia:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.mercanciaForm.valid) {
      this.loading = true;
      this.error = '';
      const mercanciaData: MercanciaRequest = this.mercanciaForm.value;

      if (this.isEditMode && this.mercanciaId) {
        this.mercanciaService.updateMercancia(this.mercanciaId, mercanciaData).subscribe({
          next: () => {
            this.router.navigate(['/mercancias']);
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            console.error('Error updating mercancia:', error);
          }
        });
      } else {
        this.mercanciaService.createMercancia(mercanciaData).subscribe({
          next: () => {
            this.router.navigate(['/mercancias']);
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            console.error('Error creating mercancia:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/mercancias']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.mercanciaForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `El valor mínimo es ${field.errors['min'].min}`;
      }
    }
    return '';
  }
} 