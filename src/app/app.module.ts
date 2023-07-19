import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieService } from 'src/services/movie.service';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from 'src/services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopMoviesComponent,
    TopRatedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [MovieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
