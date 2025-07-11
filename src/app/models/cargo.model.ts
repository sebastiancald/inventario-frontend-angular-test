/**
 * Interfaz que representa un cargo
 */
export interface Cargo {
  id?: number;
  nombre: string;
  descripcion?: string;
  fechaCreacion?: string;
  activo?: boolean;
}

/**
 * Interfaz que representa un cargo a crear o actualizar
 */
export interface CargoRequest {
  nombre: string;
  descripcion?: string;
} 