import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Imagen } from '../imagen'; // Replace with the correct path to your Imagen model

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = environment.baseUrl;
  private url = this.baseUrl + '/imagen';

  constructor(private httpClient: HttpClient) {}

  getAllImages(): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(this.url);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/imagen', formData);
  }


  getImage(id: number): Observable<Imagen> {
    return this.httpClient.get<Imagen>(`${this.url}/${id}`);
  }

  addImage(imagen: Imagen): Observable<any> {
    console.log("Imagen detail_service: " , imagen)
    return this.httpClient.post(this.url, imagen, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }); }

  updateImage(imagen: Imagen): Observable<any> {
    return this.httpClient.put(this.url, imagen, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  deleteImage(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getImagesByPacienteId(id: number): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(`${this.url}/paciente/${id}`);
  }
}
