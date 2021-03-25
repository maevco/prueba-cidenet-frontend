import { Area } from "./Area";
import { Pais } from "./Pais";
import { TipoIdentificacion } from "./TipoIdentificacion";

export class Empleado {
    id!: number;
    primerApellido!: String;
    segundoApellido!: String;
    primerNombre!: String;
    otrosNombres!: String;
    numeroIdentificacion!: String;
    pais!: Pais;
    tipoIdentificacion!: TipoIdentificacion;
    area!: Area;
    fechaIngreso!: Date;
    estado!: String;
    correoElectronico!: String;
    fechaRegistro!:Date;

    Empleado() { }

    

}