import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario, UsuarioRequest } from '../models/usuario.model';
import { Cargo } from '../models/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  /**
   * Maneja los errores de la API
   * @param error - El error HTTP
   * @returns Un observable con el mensaje de error
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.error && Array.isArray(error.error)) {
          errorMessage = error.error.map((err: any) => err.message).join(', ');
        } else {
          errorMessage = 'Error de validación en los datos enviados';
        }
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado';
      } else if (error.status === 500) {
        errorMessage = 'Error interno del servidor';
      } else {
        errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    return throwError(() => errorMessage);
  }

  /**
   * Obtiene todos los usuarios
   * @returns Un observable con la lista de usuarios
   */
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene un usuario por su ID
   * @param id - El ID del usuario
   * @returns Un observable con el usuario encontrado
   */
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Crea un nuevo usuario
   * @param usuario - El usuario a crear
   * @returns Un observable con el usuario creado
   */
  createUsuario(usuario: UsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza un usuario existente
   * @param id - El ID del usuario a actualizar
   * @param usuario - El usuario actualizado
   * @returns Un observable con el usuario actualizado
   */
  updateUsuario(id: number, usuario: UsuarioRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Elimina un usuario existente
   * @param id - El ID del usuario a eliminar
   * @returns Un observable con el resultado de la eliminación
   */
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene los usuarios por cargo
   * @param cargoId - El ID del cargo
   * @returns Un observable con la lista de usuarios del cargo
   */
  getUsuariosByCargo(cargoId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/cargo/${cargoId}`).pipe(
      catchError(this.handleError)
    );
  }
} 