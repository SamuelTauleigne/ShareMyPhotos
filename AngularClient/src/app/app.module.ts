import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PhotoListComponent } from './photos-list/photos-list.component';
import { PhotoService } from './service/photo.service';
import { PhotosDisplayComponent } from './photos-display/photos-display.component';
import { FileUploadComponentComponent } from './file-upload-component/file-upload-component.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotosComponent } from './photos/photos.component';
import { DiaporamaComponent } from './diaporama/diaporama.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponentComponent,
    PhotoListComponent,
    PhotosDisplayComponent,
    PhotoComponent,
    PhotosComponent,
    DiaporamaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }