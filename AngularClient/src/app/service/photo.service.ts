import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../photo';

@Injectable()
export class PhotoService {

  private photos: any = [];
  private photosUrl: string;

  constructor(private http: HttpClient) {
    this.photosUrl = 'http://localhost:8080/photos';
  }

  // Function creating an empty profile
  reset(): Photo {
    return { id: '', url: '', name: '', description: "" };
  }

  public findAll(): Observable<Photo[]> {
    this.photos = this.http.get<Photo[]>(this.photosUrl);
    return this.photos;
  }

  public save(photo: Photo) {
    return this.http.post<Photo>(this.photosUrl, photo);
  }

}