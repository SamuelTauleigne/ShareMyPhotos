import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-photos-display',
  templateUrl: './photos-display.component.html',
  styleUrls: ['./photos-display.component.css']
})
export class PhotosDisplayComponent implements OnInit {

  photos: Photo[];

  constructor(private photoService: PhotoService) {
    this.photos = [];
  }

  ngOnInit() {
    this.photoService.findAll().subscribe(data => {
      this.photos = data;
    });
  }

}
