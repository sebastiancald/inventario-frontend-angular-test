import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cargo, CargoRequest } from '../models/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = 'http://localhost:8080/api/cargos';

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
   * Obtiene todos los cargos
   * @returns Un observable con la lista de cargos
   */
  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene un cargo por su ID
   * @param id - El ID del cargo
   * @returns Un observable con el cargo encontrado
   */
  getCargo(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Crea un nuevo cargo
   * @param cargo - El cargo a crear
   * @returns Un observable con el cargo creado
   */
  createCargo(cargo: CargoRequest): Observable<Cargo> {
    return this.http.post<Cargo>(this.apiUrl, cargo).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza un cargo existente
   * @param id - El ID del cargo a actualizar
   * @param cargo - El cargo actualizado
   * @returns Un observable con el cargo actualizado
   */
  updateCargo(id: number, cargo: CargoRequest): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.apiUrl}/${id}`, cargo).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Elimina un cargo existente
   * @param id - El ID del cargo a eliminar
   * @returns Un observable con el resultado de la eliminación
   */
  deleteCargo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
} 