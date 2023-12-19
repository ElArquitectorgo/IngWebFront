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
  image: Imagen = new Imagen();
  //predictedData: Informe = new Informe();
  predictedData: string = '';
  informe: Informe | any = null;
  userInput: string = '';
  idImagen: number = 0;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private informeService: InformeService
  ) { }

  ngOnInit(): void {
    const imageId = this.route.snapshot.paramMap.get('id');
    if (imageId) {
      this.idImagen = parseInt(imageId, 10);
      this.fetchImage(this.idImagen);
      this.fetchOrCreateInforme(this.idImagen);
    }
  }

  fetchImage(id: number): void {
    this.imageService.getImageInfo(id).subscribe({
      next: (image) => {
        this.image = image;
        this.image.path = `${environment.baseUrl}/imagen/${this.image.id}`
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
          this.informe = informes[0];
          //this.predictedData = this.informe;

        } else {
          const newInforme: Informe = new Informe();
          newInforme.imagen = <Imagen> this.image
          
          this.informeService.createInforme(newInforme).subscribe({
            next: (createdInforme) => {
              this.informe = createdInforme;
              //this.predictedData = <Informe> createdInforme;
              this.predictedData = '';
              console.log("id: ", this.informe)
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
    this.predictedData = Math.random().toString();
    /*this.informeService.updateInforme(this.informe).subscribe({
      next: (updatedInforme) => {
        console.log('Informe updated successfully', updatedInforme);
  
        this.informeService.getInforme(this.informe.id).subscribe({
          next: (fetchedInforme) => {
            console.log(fetchedInforme)
            this.predictedData = fetchedInforme as unknown as Informe;
          },
          error: (fetchError) => {
            console.error('Error fetching updated informe:', fetchError);
          }
        });
      },
      error: (updateError) => {
        console.error('Error updating informe:', updateError);
      }
    });*/
  }

  submitNote(): void {
    if (!this.informe) {
      console.error('Informe not found');
      return;
    }
    this.informe.contenido = this.userInput;

    this.informeService.updateInforme(this.informe).subscribe({
      next: (updatedInforme) => {
        console.log('Informe updated successfully', updatedInforme);
      },
      error: (error) => {
        console.error('Error updating informe:', error);
      }
    });
  }
}
