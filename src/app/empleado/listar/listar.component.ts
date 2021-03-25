import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../service/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelo/Empleado';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit {

  error!: String;
  displayedColumns: string[] = ['id', 'primerApellido', 'segundoApellido', 'primerNombre', 'otrosNombres', 'numeroIdentificacion','pais','tipoIdentificacion','area','fechaIngreso','correoElectronico','actions'];
  dataSource!: MatTableDataSource<Empleado>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: EmpleadoService, private router: Router) { }

  ngAfterViewInit() {
    this.service.getEmpleados()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        this.error = error;
        alert(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editarEmpleado(empleado:Empleado):void{
    localStorage.setItem("id",empleado.id.toString());
    this.router.navigate(["edit"]);
  }

  
  deleteEmpleado(index: number, empleado:Empleado) {
    this.service.deleteEmpleado(empleado)
    .subscribe(data=>{
      this.dataSource.data.splice(index,1);
      this.dataSource.filter=""; 
      alert("Empleado eliminado");
    })    
  }

  ngOnInit(): void {
  }

}
