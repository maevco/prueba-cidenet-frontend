import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/modelo/Empleado';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { PaisService } from 'src/app/service/pais.service';
import { Pais } from 'src/app/modelo/Pais';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoIdentificacion } from 'src/app/modelo/TipoIdentificacion';
import { AriaDescriber } from '@angular/cdk/a11y';
import { Area } from 'src/app/modelo/Area';
import { TipoidentificacionService } from 'src/app/service/tipoidentificacion.service';
import { AreaService } from 'src/app/service/area.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  error!: String;
  empleado!: Empleado;
  paises!: Pais[];
  selectedPais!: Pais;
  tipoIdentificaciones!: TipoIdentificacion[];
  areas!: Area[];
  miFormulario!: FormGroup;
  date = new Date();
  maxDate = new Date();
  minDate = this.maxDate.setDate(this.maxDate.getDate() - 30);
  primerApellido!:String;

  
  constructor(private router: Router, private service: EmpleadoService, private paisService: PaisService, private tipoIdentificacionService: TipoidentificacionService, private areaService: AreaService) { 
    
    this.miFormulario = new FormGroup({
      'primerApellido': new FormControl(),
      'segundoApellido': new FormControl(),
      'primerNombre': new FormControl(),
      'otrosNombres': new FormControl(),
      'pais': new FormControl(),
      'tipoIdentificacion': new FormControl(),
      'numeroIdentificacion': new FormControl(),
      'fechaIngreso': new FormControl(),      
      'area': new FormControl(),      
      'estado': new FormControl(),
      'fechaRegistro': new FormControl()
    });
    
  }

  ngOnInit(): void {
    this.paisService.getPais()
      .subscribe(data => {
        this.paises = data;
      });

      this.tipoIdentificacionService.getTipoIdentificacion()
      .subscribe(data => {
        this.tipoIdentificaciones = data;
      });

      this.areaService.getArea()
      .subscribe(data => {
        this.areas = data;
      });

    this.editarEmpleado();      
    
    
  }

  editarEmpleado() {
    let id = localStorage.getItem("id");    
    this?.service?.getEmpleadoId(+id)
      .subscribe(data => {
        this.empleado = data;
        this.miFormulario = new FormGroup({
          'primerApellido': new FormControl(this.empleado.primerApellido, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[\w\s*]+[^0-9]+$/)
          ]),
          'segundoApellido': new FormControl(this.empleado.segundoApellido, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[\w\s*]+[^0-9]+$/)
          ]),
          'primerNombre': new FormControl(this.empleado.primerNombre, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[\w\s*]+[^0-9]+$/)
          ]),
          'otrosNombres': new FormControl(this.empleado.otrosNombres, [                
            Validators.pattern(/^[\w\s*]+[^0-9]+$/)
          ]),
          'numeroIdentificacion': new FormControl(this.empleado.numeroIdentificacion, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('[0-9]+[A-Z]?')
          ]),
          'fechaIngreso': new FormControl(this.empleado.fechaIngreso, [
            Validators.required
          ]),      
          'pais': new FormControl(this.empleado.pais.descripcion, [
            Validators.required
          ]),
          'tipoIdentificacion': new FormControl(this.empleado.tipoIdentificacion.descripcion, [
            Validators.required
          ]),
          'area': new FormControl(this.empleado.area.descripcion, [
            Validators.required
          ]),
          'estado': new FormControl(this.empleado.estado, [
            Validators.required
          ]),
          'fechaRegistro': new FormControl(formatDate(this.empleado.fechaRegistro, 'dd/MM/yyyy HH:mm:ss', 'en') , [
            Validators.required
          ])
        });
    
      })      
  }

  actualizarEmpleado(empleado: Empleado) {   
    empleado.primerApellido=this.miFormulario.value.primerApellido;
    empleado.segundoApellido=this.miFormulario.value.segundoApellido;
    empleado.primerNombre=this.miFormulario.value.primerNombre;
    empleado.otrosNombres=this.miFormulario.value.otrosNombres;
    empleado.pais.descripcion=this.miFormulario.value.pais.descripcion;
    empleado.tipoIdentificacion.descripcion=this.miFormulario.value.tipoIdentificacion.descripcion;
    empleado.numeroIdentificacion=this.miFormulario.value.numeroIdentificacion;
    empleado.fechaIngreso=this.miFormulario.value.fechaIngreso;
    empleado.area.descripcion=this.miFormulario.value.area.descripcion;
    this.service.updateEmpleado(empleado)
      .subscribe(data => {        
        this.empleado = data;
        alert("Se Actualizo Con Exito.....!!!");
        this.router.navigate(["listar"]);
      }, error => {
        alert('Ya existe en empleado con el tipo y numero de identificacion ingresado');
      })
  }
}

