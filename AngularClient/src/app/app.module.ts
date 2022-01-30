import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PhotoListComponent } from './photos-list/photos-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotoService } from './service/photo.service';
import { PhotosDisplayComponent } from './photos-display/photos-display.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    PhotoFormComponent,
    PhotosDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }