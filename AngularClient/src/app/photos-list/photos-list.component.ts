import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotoListComponent implements OnInit {

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