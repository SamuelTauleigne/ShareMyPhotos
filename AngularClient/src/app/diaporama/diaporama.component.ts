import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-diaporama',
  templateUrl: './diaporama.component.html',
  styleUrls: ['./diaporama.component.css']
})
export class DiaporamaComponent implements OnInit {

  /*
  imageUrls: string[] = [
    'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg'
  ];

  private imageUrlArray: string[] = ["http://localhost/sharemyphotos-storage/noushka.jpeg", "http://localhost/sharemyphotos-storage/run.jpeg"];
  */

  photos: Photo[] = [];
  photo?: Photo;
  counter: number = 0;

  constructor(
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.photoService.findAll()
      .subscribe(
        photos => {
          this.photos = photos;
          this.photo = this.photos[this.counter];
        }
      );
  }

  previous(): void {
    if (this.counter > 0 && this.counter < this.photos.length) {
      this.photo = this.photos[--this.counter];
    }
  }

  next(): void {
    if (this.counter >= 0 && this.counter < this.photos.length-1) {
      this.photo = this.photos[++this.counter];
    }
  }

}
