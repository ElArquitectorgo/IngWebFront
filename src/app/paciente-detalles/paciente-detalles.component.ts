import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { ImageService } from '../services/image.service';
import { Imagen } from '../imagen'; 
import { environment } from '../../environments/environment.development';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';



@Component({
  selector: 'app-paciente-detalles',
  templateUrl: './paciente-detalles.component.html',
  styleUrls: ['./paciente-detalles.component.css']
})
export class PacienteDetallesComponent implements OnInit {
  paciente: any; 
  images: Imagen[] = [];
  imageID: number = 0;
  url: string = environment.baseUrl + "/imagen/";

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
          image.path = `${environment.baseUrl}/imagen/${image.id}`;
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
      const formData = new FormData();
      formData.append('image', file, file.name);
      formData.append('paciente', this.paciente.id);
  
      this.imageService.uploadImage(formData).subscribe({
        next: (response) => {
          // Assume response contains the new image data, including the ID
          const imageId = response.id;
          if (imageId) {
            // Wait for a few seconds before fetching the image data
            setTimeout(() => {
              this.fetchNewImage(imageId);
              this.fetchImages();
            }, 3000); // Delay of 3 seconds
          }
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.fetchImages();
        }
      });
    }
}

fetchNewImage(imageId: number): void {
  this.imageService.getImage(imageId).subscribe({
    next: (newImage) => {
      newImage.path = `${environment.baseUrl}/images/${newImage.path}`;
      this.images.push(newImage); // Add the fetched image to the array
    },
    error: (error) => {
      console.error('Error fetching new image:', error);
    }
  });
}


}
