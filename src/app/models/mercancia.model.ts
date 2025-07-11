import { Usuario } from './usuario.model';

/**
 * Interfaz que representa una mercancia
 */
export interface Mercancia {
  id?: number;
  nombreProducto: string;
  cantidad: number;
  fechaIngreso: string;
  usuarioRegistro?: Usuario;
  usuarioModificacion?: Usuario;
  fechaModificacion?: string;
  fechaCreacion?: string;
  activo?: boolean;
}

/**
 * Interfaz que representa una mercancia a crear o actualizar
 */
export interface MercanciaRequest {
  nombreProducto: string;
  cantidad: number;
  fechaIngreso: string;
  usuarioRegistroId: number;
  usuarioModificacionId?: number;
}

/**
 * Interfaz que representa los filtros para obtener mercancias
 */
export interface MercanciaFiltro {
  fechaIngreso?: string;
  usuarioId?: number;
  nombreProducto?: string;
} 