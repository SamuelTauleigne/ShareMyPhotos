import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../service/photo.service';
import { HttpClient } from '@angular/common/http';
import { interval, mergeMap } from 'rxjs';

@Component({
  selector: 'app-diaporama',
  templateUrl: './diaporama.component.html',
  styleUrls: ['./diaporama.component.css']
})
export class DiaporamaComponent implements OnInit {

  diaporamaSubscription: any;
  photos: Photo[] = [];
  photo?: Photo;
  counter: number = 0;

  constructor(
    private photoService: PhotoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.diaporamaSubscription = interval(0.2 * 1000)
      .pipe(
          mergeMap(() => this.http.get<Photo>("http://localhost:8080/diaporama"))
      )
      .subscribe(photo => this.photo = photo);
  }

  ngOnDestroy(): void {
    this.diaporamaSubscription.unsubscribe();
  }

  previous(): void {
    this.http.post<Photo>("http://localhost:8080/diaporama/previous", this.photo)
      .subscribe(
        photo => {
          this.photo = photo;
        }
      );
  }

  next(): void {
    this.http.post<Photo>("http://localhost:8080/diaporama/next", this.photo)
      .subscribe(
        photo => {
          this.photo = photo;
        }
      );
  }

}
