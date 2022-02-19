import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photos-list/photos-list.component';
import { PhotosDisplayComponent } from './photos-display/photos-display.component';
import { FileUploadComponentComponent} from "./file-upload-component/file-upload-component.component";
import { PhotoComponent } from './photo/photo.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [
  { path: 'upload', component: FileUploadComponentComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'showphotos', component: PhotosDisplayComponent },
  { path: 'photos/:id', component: PhotoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }