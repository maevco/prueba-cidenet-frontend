import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }
  Url = 'http://localhost:8080/api/pais/';

  getPais(): Observable<any> {
    return this.http.get<any[]>(this.Url).pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error.message || "Error servidor");
  }

}
