import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/interfaces/imovie';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
  topRatedMovies: IMovie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getTopRatedMovies();
  }

  getTopRatedMovies() {
    this.movieService.topRatedMovies()
    .subscribe(
      movies => {
        this.topRatedMovies = movies;
        console.log(this.topRatedMovies);
      },
      error => {
        console.error('Erro ao obter os filmes mais curtidos:', error);
      }
    );
  }

}
