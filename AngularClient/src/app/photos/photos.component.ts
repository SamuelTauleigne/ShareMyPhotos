import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photo';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  
  photos: Photo[] = [];
  photo: Photo = this.photoService.reset();
  filter: string="";
  formData!: FormGroup;
  filesToUpload!: File[];

  constructor(
    private photoService: PhotoService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPhotos();
    this.formData = this.formBuilder.group({
      files   : []
    });
  }
  
  getPhotos(): void {

    let _photos: Photo[] = [];
    this.photoService.findAll()
      .subscribe(
        photos => {
          this.photos = photos;
          for (var photo of this.photos) {
            if (photo.description.toLowerCase().includes(this.filter.toLowerCase()) || photo.name.toLowerCase().includes(this.filter.toLowerCase())) {
              _photos.push(photo);
            }
          }
          this.photos = _photos;
          console.log(_photos);
        }
      );

  }

  createPhotoWithObservable(): Observable<Photo> {
    const body = {
      "url": this.photo.url,
      "name": this.photo.name,
      "description": this.photo.description
    };
    const url = `http://localhost:8080/photos`;
    return this.httpClient.post<Photo>(url, body);
  }

  createPhoto(): void {
    this.createPhotoWithObservable()
      .subscribe(
        photo => {
          this.getPhotos();
          this.photoService.reset();
        }
      );
  }

  handleFilesInput($event: any) {
    this.filesToUpload = <File[]>$event.target.files;
  }

  onSubmitMultiple(): void {
    const formData: FormData = new FormData();

    for (var file of this.filesToUpload) {
      formData.append('document', file, file.name);
      this.photo.url = "http://localhost/sharemyphotos-storage/" + file.name;
      this.createPhoto();
    }
 
    let url = 'http://localhost:8080/photos/upload';
 
    this.httpClient.post(url, formData).subscribe();
    
  }

  deleteAllWithObservable(): Observable<Photo> {
    return this.httpClient.delete<Photo>("http://localhost:8080/photos");
  }

  deleteAll(): void {
    this.deleteAllWithObservable()
      .subscribe(
        photo => {
          this.getPhotos();
          photo = this.photoService.reset();
        }
      );
  }

}
