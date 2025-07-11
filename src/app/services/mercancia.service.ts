import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mercancia, MercanciaRequest, MercanciaFiltro } from '../models/mercancia.model';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {
  private apiUrl = 'http://localhost:8080/api/mercancias';

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
   * Obtiene todas las mercancias
   * @returns Un observable con la lista de mercancias
   */
  getMercancias(): Observable<Mercancia[]> {
    return this.http.get<Mercancia[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene una mercancia por su ID
   * @param id - El ID de la mercancia
   * @returns Un observable con la mercancia encontrada
   */
  getMercancia(id: number): Observable<Mercancia> {
    return this.http.get<Mercancia>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Crea una nueva mercancia
   * @param mercancia - La mercancia a crear
   * @returns Un observable con la mercancia creada
   */
  createMercancia(mercancia: MercanciaRequest): Observable<Mercancia> {
    return this.http.post<Mercancia>(this.apiUrl, mercancia).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza una mercancia existente
   * @param id - El ID de la mercancia a actualizar
   * @param mercancia - La mercancia actualizada
   * @returns Un observable con la mercancia actualizada
   */
  updateMercancia(id: number, mercancia: MercanciaRequest): Observable<Mercancia> {
    return this.http.put<Mercancia>(`${this.apiUrl}/${id}`, mercancia).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Elimina una mercancia existente
   * @param id - El ID de la mercancia a eliminar
   * @param usuarioId - El ID del usuario que elimina la mercancia
   * @returns Un observable con el resultado de la eliminación
   */
  deleteMercancia(id: number, usuarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}?usuarioId=${usuarioId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene las mercancias por filtros
   * @param filtro - Los filtros a aplicar
   * @returns Un observable con la lista de mercancias filtradas
   */
  getMercanciasByFiltros(filtro: MercanciaFiltro): Observable<Mercancia[]> {
    let params = new HttpParams();
    
    if (filtro.fechaIngreso) {
      params = params.set('fechaIngreso', filtro.fechaIngreso);
    }
    if (filtro.usuarioId) {
      params = params.set('usuarioId', filtro.usuarioId.toString());
    }
    if (filtro.nombreProducto) {
      params = params.set('nombreProducto', filtro.nombreProducto);
    }

    return this.http.get<Mercancia[]>(`${this.apiUrl}/filtros`, { params }).pipe(
      catchError(this.handleError)
    );
  }
} 