import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { ImageService } from '../services/image.service';
import { Imagen } from '../imagen'; 
import { environment } from '../../environments/environment.development';



@Component({
  selector: 'app-paciente-detalles',
  templateUrl: './paciente-detalles.component.html',
  styleUrls: ['./paciente-detalles.component.css']
})
export class PacienteDetallesComponent implements OnInit {
  paciente: any; 
  images: Imagen[] = [];

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.paramMap.get('id');
    if (pacienteId) {
      this.pacienteService.getAccount(+pacienteId).subscribe(paciente => {
        
        this.paciente = paciente;
        this.fetchImages();
       
      });
    }
  }

  fetchImages(): void {
    this.imageService.getImagesByPacienteId(this.paciente.id).subscribe({
      next: (images: Imagen[]) => {
        this.images = images.map(image => {
          image.path = `${environment.baseUrl}/images/${image.path}`;
          return image;
        });
      },
      error: (error) => {
        console.error('Error fetching images:', error);
      }
    });
  }

  
  uploadImage(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result; 
        const newImage = new Imagen();
        newImage.path = imageUrl;
        this.images.push(newImage);
  
        const formData = new FormData();
        formData.append('file', file, file.url);
        formData.append('paciente', JSON.stringify(this.paciente));
  
        this.imageService.uploadImage(formData).subscribe({
          next: (response) => {
          },
          error: (error) => {
            console.error('Error uploading image:', error);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  }


}
