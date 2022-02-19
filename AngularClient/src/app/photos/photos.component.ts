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
  formData!: FormGroup;
  fileToUpload1!: File;
  // fileToUpload2!: File;

  constructor(
    private photoService: PhotoService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPhotos();
    this.formData = this.formBuilder.group({
      files   : []
    });
  }
  
  getPhotos(): void {
    this.photoService.findAll()
      .subscribe(photos => this.photos = photos);
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

  handleFileInput1($event: any) {
    this.fileToUpload1 = <File>$event.target.files[0];
    this.photo.url = "http://localhost/sharemyphotos-storage/" + this.fileToUpload1.name;
  }
 
  /*
  handleFileInput2($event: any) {
    this.fileToUpload2 = <File>$event.target.files[0];
  }
  */
 
  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('document', this.fileToUpload1, this.fileToUpload1.name);
    // formData.append('document', this.fileToUpload2, this.fileToUpload2.name);
 
    let url = 'http://localhost:8080/photos/upload';
 
    this.httpClient.post(url, formData, {observe: 'response'}).subscribe(
      resp => {
        console.log(resp.body);
      },
      err => {
        console.log(err);
      }
    );
    
  }
  
  gotoPhotosList() {
    this.router.navigate(['/photos']);
  }

}
