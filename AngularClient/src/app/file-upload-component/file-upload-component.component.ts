import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { PhotosComponent } from '../photos/photos.component';
import { PhotoService } from '../service/photo.service';
 
@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload-component.component.html',
  styleUrls: ['./file-upload-component.component.css']
})
export class FileUploadComponentComponent implements OnInit {
 
  formData!: FormGroup;
  fileToUpload1!: File;
  // fileToUpload2!: File;
/*
  photo1: Photo = new Photo();
  photo2: Photo = new Photo();
*/
 
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {
/*
    this.photo1.setName('run.jpeg');
    this.photo1.setDescription('Description1');

    this.photo2.setName('noushka.jpeg');
    this.photo2.setDescription('Description2');
*/
  }
 
 
  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      files   : []
    });
  }
 
  handleFileInput1($event: any) {
    this.fileToUpload1 = <File>$event.target.files[0];
  }

  /*
  handleFileInput2($event: any) {
    this.fileToUpload2 = <File>$event.target.files[0];
  }
  */
 
  onSubmit():void {
 
    const formData: FormData = new FormData();
    formData.append('document', this.fileToUpload1, this.fileToUpload1.name);
    // formData.append('document', this.fileToUpload2, this.fileToUpload2.name);
 
    let url = 'http://localhost:8080/photos/upload';
 
    this.httpClient
      .post(url, formData, {observe: 'response'}).subscribe(
      resp => {
        console.log(resp.body);
      },
      err => {
        console.log(err);
      }
      );
/*
    this.photo1.setUrl("http://localhost/sharemyphotos-storage/" + this.fileToUpload1.name);
    this.photo2.setUrl("http://localhost/sharemyphotos-storage/" + this.fileToUpload2.name);
    this.photoService.save(this.photo1).subscribe(result => this.gotoPhotosList());
    this.photoService.save(this.photo2).subscribe(result => this.gotoPhotosList());
*/
    
/*
    this.photo.setUrl("http://localhost/sharemyphotos-storage/" + this.fileToUpload1.name);
    this.photo.setName(this.fileToUpload1.name);
    this.photo.setDescription("Description");
*/
    // this.photo.createPhoto();

  }

  gotoPhotosList() {
    this.router.navigate(['/photos']);
  }
}