import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from '../services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {

  displayedColumns = ['id', 'dni', 'nombre', 'edad', 'cita'];
  accounts: JSON[] =[];
  element = {};
  dataSource = new MatTableDataSource(this.accounts);
  
  constructor(private pacienteService: PacienteService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog) { }
    
  ngOnInit(): void {  
    this.updateData();
  }

  updateData(){
    this.pacienteService.getAccounts().subscribe({
      next: (accounts: JSON[]) => {
        console.log(accounts);
        this.accounts = accounts;
        this.dataSource.data=this.accounts;
      },
      error: (e: any) => {
        this.snackbar.open('Error getting the pacientes '+e.error, '', {
          duration: 3000
        });
      },
      complete: () => console.log('done'),
    });
  }
  delete(id: number){
    this.pacienteService.deleteAccount(id).subscribe({
      next: () => {
        this.updateData();
      },
      error: (e: any) => {
        this.snackbar.open('Error deleting the paciente '+e.error, '', {
          duration: 3000
        });
      },
      complete: () => console.log('done'),
    });
  }

  confirmDeletion(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Paciente ' + id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }
}