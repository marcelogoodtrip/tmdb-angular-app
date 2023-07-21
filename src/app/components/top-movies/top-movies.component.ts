import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { IMovie } from 'src/interfaces/imovie';
import { AuthService } from 'src/services/auth.service';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent {
  topMovies: IMovie[] = [];

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getAll()
      .then(movies => {
        movies?.sort((a, b) => b.popularity - a.popularity);
        this.topMovies = movies?.slice(0, 10)|| [];
        console.log(this.topMovies);
        const moviesToSend: IMovie[] = this.topMovies.filter(movie => {
          return !this.movieService.getSentMovieIds().includes(movie.id);
        });
        //this.saveTopMovies(moviesToSend);
      })
      .catch(error => {
        console.error(error);
      });
  }

  saveTopMovies(moviesToSend: IMovie[]) {
    for (const movie of moviesToSend) {
      this.movieService.sendTopMovieToNest(movie)
        .subscribe(
          (response: any) => {
            this.movieService.getSentMovieIds().push(movie.id);

            console.log('Dados enviados com sucesso!');
          },
          (error: any) => {
            console.error('Erro ao enviar os dados:', error);
          }
        );
    }
  }

  likeMovie(movie: IMovie) {
    if(this.authService.isLoggedIn()) {
      this.movieService.likeMovie(movie.id)
      .subscribe(
        () => {
          movie.like++;
          console.log('Filme curtido com sucesso!');
          alert('Filme curtido com sucesso!');
        },
        error => {
          console.error('Erro ao curtir o filme:', error);
          alert('Erro ao curtir o filme.');
        }
      );
    } else {
      console.log('Usuário não autenticado.');
      alert('Usuário não autenticado. Faça login para curir filmes.')
        this.router.navigate(['/login']);
    }
  }
}
