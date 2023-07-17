import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopMoviesComponent } from './components/top-movies/top-movies.component';
import { TopRatedComponent } from './components/top-rated/top-rated.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'top-movies', component: TopMoviesComponent },
  { path: 'top-rated', component: TopRatedComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
