import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CargoService } from '../../../services/cargo.service';
import { Usuario, UsuarioRequest } from '../../../models/usuario.model';
import { Cargo } from '../../../models/cargo.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;
  isEditMode = false;
  usuarioId: number | null = null;
  loading = false;
  error = '';
  cargos: Cargo[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      cargoId: ['', Validators.required],
      fechaIngreso: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCargos();
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.usuarioId = +id;
        this.loadUsuario(this.usuarioId);
      }
    });
  }

  loadCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: (data) => {
        this.cargos = data;
        console.log('Cargos cargados:', this.cargos);
      },
      error: (error) => {
        console.error('Error loading cargos:', error);
        this.error = error;
      }
    });
  }

  loadUsuario(id: number): void {
    this.loading = true;
    this.usuarioService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          edad: usuario.edad,
          cargoId: usuario.cargo?.id || '',
          fechaIngreso: usuario.fechaIngreso
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.error('Error loading usuario:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.loading = true;
      this.error = '';
      const formData = this.usuarioForm.value;
      
      console.log('Form data:', formData);
      console.log('Cargos disponibles:', this.cargos);
      
      const cargoSeleccionado = this.cargos.find(c => c.id === +formData.cargoId);
      console.log('Cargo seleccionado:', cargoSeleccionado);
      
      if (!cargoSeleccionado) {
        this.error = 'Debe seleccionar un cargo válido';
        this.loading = false;
        return;
      }

      const usuarioData: UsuarioRequest = {
        nombre: formData.nombre,
        edad: formData.edad,
        cargo: cargoSeleccionado,
        fechaIngreso: formData.fechaIngreso
      };

      console.log('Usuario data a enviar:', usuarioData);

      if (this.isEditMode && this.usuarioId) {
        this.usuarioService.updateUsuario(this.usuarioId, usuarioData).subscribe({
          next: () => {
            this.router.navigate(['/usuarios']);
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            console.error('Error updating usuario:', error);
          }
        });
      } else {
        this.usuarioService.createUsuario(usuarioData).subscribe({
          next: () => {
            this.router.navigate(['/usuarios']);
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
            console.error('Error creating usuario:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.usuarioForm.get(fieldName);
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