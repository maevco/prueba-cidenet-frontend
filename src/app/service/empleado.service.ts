import { Injectable } from '@angular/core';
import { Empleado } from '../modelo/Empleado';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }
  Url = 'http://localhost:8080/api/empleado/';

  getEmpleados(): Observable<any> {
    return this.http.get<any[]>(this.Url).pipe(catchError(this.handleError));
  }

  createEmpleado(empleado: Empleado) {
    return this.http.post<Empleado>(this.Url, empleado).pipe(catchError(this.handleError));;
  }

  getEmpleadoId(id:number){
    return this.http.get<Empleado>(this.Url+"/"+id);
  }

  updateEmpleado(empleado:Empleado){
    return this.http.put<Empleado>(this.Url+"/"+empleado.id,empleado);
  }

  handleError(error) {
    return throwError(error.message || "Error servidor");
  }

  deleteEmpleado(empleado:Empleado){
    return this.http.delete<Empleado>(this.Url+"/"+empleado.id);
  }


  
}
