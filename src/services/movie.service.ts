import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMovie } from 'src/interfaces/imovie';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<{ results: IMovie[] }>(`${environment.API_PATH}top_rated?${environment.API_KEY}&language=pt-BR`)
    .pipe(map(response => response.results))
    .toPromise();
  }

  // sendTopMoviesToNest(movie: IMovie): Observable<any> {
  //   return this.httpClient.post('http://localhost:3000/save-top-movies', movie)
  //     .pipe(
  //       tap((response: any) => {
  //         console.log('Dados enviados com sucesso!');
  //         // Faça algo com a resposta, se necessário
  //       }),
  //       catchError((error: any) => {
  //         console.error('Erro ao enviar os dados:', error);
  //         // Trate o erro adequadamente
  //         return throwError(error);
  //       })
  //     );
  // }

  likeMovie(movieId: number): Observable<any> {
    const url = `${environment.NEST_API_PATH}${movieId}/like`;
    return this.httpClient.post(url, {});
  }
}
