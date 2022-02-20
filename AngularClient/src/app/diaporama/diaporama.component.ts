import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../service/photo.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { interval, mergeMap, Observable } from 'rxjs';

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

  diaporamaSubscription: any;

  photos: Photo[] = [];
  photo?: Photo;
  counter: number = 0;
  // myWebSocket: WebSocketSubject<String> = webSocket('ws://localhost:8080/chat');

  constructor(
    private photoService: PhotoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    /*
    this.photoService.findAll()
      .subscribe(
        photos => {
          this.photos = photos;
          this.photo = this.photos[this.counter];
        }
      );
      */
      this.diaporamaSubscription = interval(0.2 * 1000)
      .pipe(
          mergeMap(() => this.http.get<Photo>("http://localhost:8080/diaporama"))
      )
      .subscribe(photo => this.photo = photo)
    
    // this.myWebSocket.asObservable().subscribe(dataFromServer => console.log("Subscribed to WebSocket"));
  }

  ngOnDestroy(): void {
    this.diaporamaSubscription.unsubscribe();
    console.log("out");
  }

  checkDiaporama(): void {
    this.http.get<Photo>("http://localhost:8080/diaporama")
      .subscribe(
        photo => {
          this.photo = photo;
        }
      );
  }

  previous(): void {
    this.http.post<Photo>("http://localhost:8080/diaporama/previous", this.photo)
      .subscribe(
        photo => {
          this.photo = photo;
        }
      )
  }

  next(): void {
    this.http.post<Photo>("http://localhost:8080/diaporama/next", this.photo)
      .subscribe(
        photo => {
          this.photo = photo;
        }
      )
  }



  /* WEBSOCKET */


  send(): void {
    // this.myWebSocket.next('some message');
  }


}
