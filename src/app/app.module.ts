import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './empleado/add/add.component';

import { EmpleadoService } from '../app/service/empleado.service';
import { ListarComponent } from './empleado/listar/listar.component';

/* Angular material */
import { AngularMaterialModule } from './angular-material/angular-material.module';

import {ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './empleado/edit/edit.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListarComponent,
    EditComponent,
    MatConfirmDialogComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
