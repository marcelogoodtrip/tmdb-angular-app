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

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

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
    const url = `${environment.NEST_API_PATH}top-movies/${movieId}/like`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}` // Aqui usamos o token de autenticação do serviço AuthService
      })
    };
    return this.httpClient.post(url, {}, httpOptions);
  }

  // likeMovie(movieId: number): Observable<any> {
  //   const url = `${environment.NEST_API_PATH}top-movies/${movieId}/like`;
  //   const token = this.authService.getToken();
  //   if (token) {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     return this.httpClient.post(url, {}, { headers });
  //   } else {
  //     // this.router.navigate(['/login']); // Certifique-se de importar o Router no MovieService.
  //     return throwError('Token JWT ausente.');
  //   }
  // }

  topRatedMovies(): Observable<IMovie[]> {
    const url = `${environment.NEST_API_PATH}top-movies/top-rated-movies`;
    return this.httpClient.get<IMovie[]>(url);
  }
}
