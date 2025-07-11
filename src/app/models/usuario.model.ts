import { Cargo } from './cargo.model';

/**
 * Interfaz que representa un usuario
 */
export interface Usuario {
  id?: number;
  nombre: string;
  edad: number;
  cargo?: Cargo;
  fechaIngreso: string;
  fechaCreacion?: string;
  activo?: boolean;
}

/**
 * Interfaz que representa un usuario a crear o actualizar
 */
export interface UsuarioRequest {
  nombre: string;
  edad: number;
  cargo: Cargo;
  fechaIngreso: string;
} 