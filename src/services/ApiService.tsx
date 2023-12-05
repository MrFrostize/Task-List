import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

class ApiService {
  static url: string = 'http://localhost:3000'; // URL de base de votre API

  // Envoi d'une requête GET
  static get<T>(endpoint: string): Observable<T> {
    return from(fetch(`${this.url}/${endpoint}`)).pipe(
      mergeMap(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json() as Promise<T>;
      }),
      catchError(error => {
        console.error('Erreur lors de la requête GET:', error);
        throw error;
      })
    );
  }

  // Envoi d'une requête POST
  static post<T>(endpoint: string, data: any): Observable<T> {
    return from(fetch(`${this.url}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })).pipe(
      mergeMap(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json() as Promise<T>;
      }),
      catchError(error => {
        console.error('Erreur lors de la requête POST:', error);
        throw error;
      })
    );
  }

  // Envoi d'une requête PUT
  static put<T>(endpoint: string, data: any): Observable<T> {
    return from(fetch(`${this.url}/${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })).pipe(
      mergeMap(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json() as Promise<T>;
      }),
      catchError(error => {
        console.error('Erreur lors de la requête PUT:', error);
        throw error;
      })
    );
  }

  // Envoi d'une requête DELETE
  static delete<T>(endpoint: string): Observable<T> {
    return from(fetch(`${this.url}/${endpoint}`, {
      method: 'DELETE'
    })).pipe(
      mergeMap(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json() as Promise<T>;
      }),
      catchError(error => {
        console.error('Erreur lors de la requête DELETE:', error);
        throw error;
      })
    );
  }
}

export default ApiService;
