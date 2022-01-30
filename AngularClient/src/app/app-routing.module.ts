import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photos-list/photos-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosDisplayComponent } from './photos-display/photos-display.component';

const routes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: 'addphoto', component: PhotoFormComponent },
  { path: 'showphotos', component: PhotosDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }