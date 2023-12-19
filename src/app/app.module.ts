import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component'; 
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatListModule} from '@angular/material/list'; 

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { PacienteDetallesComponent } from './paciente-detalles/paciente-detalles.component';
import { PacienteCreateComponent } from './paciente-create/paciente-create.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ConfirmDialogComponent,
    PacienteDetallesComponent,
    PacienteCreateComponent,
    ImageDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
