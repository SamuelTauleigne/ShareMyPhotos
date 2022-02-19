import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photo';
import { PhotoService } from '../service/photo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() photo!: Photo;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private location: Location,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPhoto();
    console.log(this.photo);
  }
  
  getPhoto(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.getPhotoById(id)
      .subscribe(photo => this.photo = photo);
  }

  getPhotoById(id: String): Observable<Photo> {
    const url = `http://localhost:8080/photos/${id}`;
    console.log(url);
    return this.http.get<Photo>(url);
  }

  modifyWithObservable(): Observable<Photo> {
    const body = {
      "url": this.photo?.url,
      "name": this.photo?.name,
      "description": this.photo?.description
    };
    const url = `http://localhost:8080/photos/${this.photo?.id}`;
    return this.http.put<Photo>(url, body);
  }

  modify(): void {
    this.modifyWithObservable()
      .subscribe(
        profile => {
          this.photoService.findAll();
          this.router.navigate(['/photos']);
        }
      );
  }
  
  deleteWithObservable(): Observable<Photo> {
    const url = `http://localhost:8080/photos/${this.photo?.id}`;
    return this.http.delete<Photo>(url);
  }

  delete(): void {
    this.deleteWithObservable()
      .subscribe(
        photo => {
          this.photoService.findAll();
          photo = this.photoService.reset();
          this.router.navigate(['/photos']);
        }
      );
  }

  goBack(): void {
    this.location.back();
  }

}
