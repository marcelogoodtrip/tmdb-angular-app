import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMovie } from 'src/interfaces/imovie';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private sentMovieIds: number[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAll() {
    return this.httpClient.get<{ results: IMovie[] }>(`${environment.API_PATH}top_rated?${environment.API_KEY}&language=pt-BR`)
    .pipe(map(response => response.results))
    .toPromise();
  }

  sendTopMovieToNest(movie: IMovie): Observable<any> {
    return this.httpClient.post(`${environment.NEST_API_PATH}top-movies/save-top-movie`, movie)
      .pipe(
        tap((response: any) => {
          console.log('Dados enviados com sucesso!');
        }),
        catchError((error: any) => {
          console.error('Erro ao enviar os dados:', error);
          return throwError(error);
        })
      );
  }

  getSentMovieIds(): number[] {
    return this.sentMovieIds;
  }

  likeMovie(movieId: number): Observable<any> {
    const url = `${environment.NEST_API_PATH}top-movies/${movieId}/like`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      })
    };
    return this.httpClient.post(url, {}, httpOptions);
  }

  topRatedMovies(): Observable<IMovie[]> {
    const url = `${environment.NEST_API_PATH}top-rated`;
    return this.httpClient.get<IMovie[]>(url);
  }
}
