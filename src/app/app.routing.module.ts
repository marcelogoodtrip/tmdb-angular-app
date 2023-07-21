import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [

  { path: '', component: TopMoviesComponent },
  { path: 'top-rated', component: TopRatedComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
