import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-paciente-detalles',
  templateUrl: './paciente-detalles.component.html',
  styleUrls: ['./paciente-detalles.component.css']
})
export class PacienteDetallesComponent implements OnInit {
  paciente: any; 

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.paramMap.get('id');
    if (pacienteId) {
      this.pacienteService.getAccount(+pacienteId).subscribe(paciente => {
        this.paciente = paciente;
      });
    }
  }
}
