import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/modelo/Empleado';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { PaisService } from 'src/app/service/pais.service';
import { Pais } from 'src/app/modelo/Pais';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoIdentificacion } from 'src/app/modelo/TipoIdentificacion';
import { AriaDescriber } from '@angular/cdk/a11y';
import { Area } from 'src/app/modelo/Area';
import { TipoidentificacionService } from 'src/app/service/tipoidentificacion.service';
import { AreaService } from 'src/app/service/area.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})

export class AddComponent implements OnInit {

  error!: String;
  empleado: Empleado = new Empleado();
  paises!: Pais[];
  selectedPais!: Pais;
  tipoIdentificaciones!: TipoIdentificacion[];
  areas!: Area[];
  miFormulario!: FormGroup;
  date = new Date();
  maxDate = new Date();
  minDate = this.maxDate.setDate(this.maxDate.getDate() - 30);
  
  
  
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
      'estado': new FormControl()
    });

    this.miFormulario = new FormGroup({
      'primerApellido': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[\w\s*]+[^0-9]+$/)
      ]),
      'segundoApellido': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[\w\s*]+[^0-9]+$/)
      ]),
      'primerNombre': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[\w\s*]+[^0-9]+$/)
      ]),
      'otrosNombres': new FormControl('', [                
        Validators.pattern(/^[\w\s*]+[^0-9]+$/)
      ]),
      'numeroIdentificacion': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[0-9]+[A-Z]?')
      ]),
      'fechaIngreso': new FormControl('', [
        Validators.required
      ]),      
      'pais': new FormControl('', [
        Validators.required
      ]),
      'tipoIdentificacion': new FormControl('', [
        Validators.required
      ]),
      'area': new FormControl('', [
        Validators.required
      ]),
      'estado': new FormControl('Activo', [
        Validators.required
      ])
    });
   }

   

  guardarEmpleado(empleado: Empleado) {    
    empleado= this.miFormulario.value;
    this.service.createEmpleado(empleado)
      .subscribe(data => {
        alert("Se Agrego Con Exito...!!");
        this.router.navigate(["listar"]);
      }, error => {
        alert('Usuario ya existe con tipo y numero de identificacion ingresado');
      })
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
  }
  
}
