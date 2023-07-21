import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { MovieService } from 'src/services/movie.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMoviesComponent,
    TopRatedComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MovieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
