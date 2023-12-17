// image-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { InformeService } from '../services/informe.service';
import { Imagen } from '../imagen';
import { Informe } from '../informe';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  image: Imagen | null = null;
  predictedData: any = {};
  informe: Informe | any = null;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private informeService: InformeService
  ) { }

  ngOnInit(): void {
    const imageId = this.route.snapshot.paramMap.get('id');
    if (imageId) {
      const id = parseInt(imageId, 10);
      this.fetchImage(id);
      this.fetchOrCreateInforme(id);
    }
  }

  fetchImage(id: number): void {
    this.imageService.getImage(id).subscribe({
      next: (image) => {
        image.path = `${environment.baseUrl}/images/${image.path}`;
        this.image = image;
        console.log("elements ",this.image );

      },
      error: (error) => {
        console.error('Error fetching image:', error);
      }
    });
  }

  fetchOrCreateInforme(imageId: number): void {
    this.informeService.getInformeImagen(imageId).subscribe({
      next: (informes) => {
        if (informes.length > 0) {
          this.informe = informes[0]; // Assuming the first one is the relevant informe
        } else {
          // Create a new Informe
          const newInforme: Informe = new Informe();
          newInforme.imagen = <Imagen> this.image
          newInforme.contenido = "dddd";
          newInforme.prediccion = "3222";
          console.log("elements1 ",newInforme );
          
          this.informeService.createInforme(newInforme).subscribe({
            next: (createdInforme) => {
              this.informe = createdInforme;
            },
            error: (error) => {
              console.error('Error creating informe:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching informe:', error);
      }
    });
  }

  predict(): void {
    // Prediction logic here
    // For example, update predictedData based on the prediction result
    // Also create a new Informe as required
    const newInforme: Informe = new Informe;
    newInforme.imagen = <Imagen>this.image;
    this.informeService.createInforme(newInforme).subscribe({
      next: (createdInforme) => {
        // Update UI or state as necessary
      },
      error: (error) => {
        console.error('Error creating new informe:', error);
      }
    });
  }
}
