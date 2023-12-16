import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { ImageService } from '../services/image.service';
import { Imagen } from '../imagen'; // Make sure the path is correct
import { Paciente } from '../paciente';


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
    //private id_paciente: id
  ) { }

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.paramMap.get('id');
    if (pacienteId) {
      this.pacienteService.getAccount(+pacienteId).subscribe(paciente => {
        
        this.paciente = paciente;
        // if (!this.paciente.images) {
        //   this.paciente.images = []; // Initialize the images array
        // }
      });
    }
  }


  
  uploadImage(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result; // This is the local URL for display
  
        // Display the image immediately
        const newImage = new Imagen();
        newImage.path = imageUrl;
        this.images.push(newImage);
  
        // Prepare the data to send to backend
        const formData = new FormData();
        formData.append('file', file, file.url);
        formData.append('paciente', JSON.stringify(this.paciente)); // Convert the Paciente object to a JSON string
  
        // Call the backend to store the image information
        this.imageService.uploadImage(formData).subscribe({
          next: (response) => {
            // Handle the response if needed
          },
          error: (error) => {
            console.error('Error uploading image:', error);
          }
        });
      };
      reader.readAsDataURL(file); // Convert the file to a data URL for immediate display
    }
  }



  // uploadImagee(event: any): void {
  //   const file = event.target.files[0];
    
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const imageUrl = e.target.result; // This is the local URL
  //       const imagen = new Imagen();
  //       imagen.path = imageUrl;  // Use the local URL as the path
  //       this.images.push(imagen); // Add the new image to the images array
  //       const pacienteId = this.route.snapshot.paramMap.get('id');
  //       if (pacienteId) {
  //       this.pacienteService.getAccount(+pacienteId).subscribe(paciente => {
  //         this.paciente = paciente;  
  //         // Now we set the paciente_id for the Imagen
  //         imagen.paciente = this.paciente;
  //         this.imageService.addImage(imagen).subscribe({
  //           next: (response) => {
  //             //nothing
  //           },
  //           error: (error) => {
  //             console.error('Error uploading image:', error);
  //           }
  //         });
  //       });
  //     }
  //   }

        
  //     };
  //     reader.readAsDataURL(file); // Convert the file to a data URL
  //   }
  // }



  // uploadImage(event: any): void {
    
  //   if (file) {
  //     const imagen = new Imagen();
  //     imagen.path = file.name;
  
      
  
  //         // Call the service to send the Imagen object to the server
          
  // }
  

}
