import { Component } from '@angular/core';
import { IMovie } from 'src/interfaces/imovie';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent {
  movies: IMovie[] = [];
  topMovies: IMovie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getAll()
      .then(movies => {
        movies?.sort((a, b) => b.popularity - a.popularity);
        this.topMovies = movies?.slice(0, 10) || [];
        console.log(this.topMovies);
      })
      .catch(error => console.error(error));
  }
}
