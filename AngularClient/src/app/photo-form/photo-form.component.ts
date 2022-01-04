import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../service/photo.service';
import { Photo } from '../model/photo';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent {

  photo: Photo;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private userService: PhotoService) {
    this.photo = new Photo();
  }

  onSubmit() {
    this.userService.save(this.photo).subscribe(result => this.gotoUserList());
  }

  gotoUserList() {
    this.router.navigate(['/photos']);
  }
}