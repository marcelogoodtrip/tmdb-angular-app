import { Component } from '@angular/core';
import { IMovie } from 'src/interfaces/imovie';
import { MovieService } from 'src/services/movie.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste-tecla-t';

  constructor(private movieService: MovieService) {}

  getAllMovies() {
    this.movieService.getAll()
    .then(movies => {
      movies = movies?.slice(0, 10);
      console.log(movies)
    })
    .catch(error => console.error(error));
  }
}
