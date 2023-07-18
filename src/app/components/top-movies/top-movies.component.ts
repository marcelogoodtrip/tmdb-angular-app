import { Component } from '@angular/core';
import { IMovie } from 'src/interfaces/imovie';
import { MovieService } from 'src/services/movie.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent {
  topMovies: IMovie[] = [];

  constructor(private movieService: MovieService, private authService: AuthService) {}

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
      .catch(error => {
        console.error(error);
      });
  }

  likeMovie(movie: IMovie) {
    if(this.authService.isLoggedIn()) {
      this.movieService.likeMovie(movie.id)
      .subscribe(
        () => {
          movie.like++;
          console.log('Filme curtido com sucesso!');
        },
        error => {
          console.error('Erro ao curtir o filme:', error);
        }
      );
    } else {
      console.log('Usuário não autenticado.');
      // Aqui você pode adicionar o redirecionamento para a página de login
    }
  }

  // likeMovie(movie: IMovie) {
  //   movie.like++;
  //   this.movieService.likeMovie(movie.id)
  //     .pipe(
  //       tap(() => {
  //         console.log('Curtida registrada com sucesso!');
  //       }),
  //       catchError((error) => {
  //         console.error('Erro ao registrar a curtida:', error);
  //         movie.like--;
  //         return throwError(error);
  //       })
  //     )
  //     .subscribe();
  // }
}
