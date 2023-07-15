import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMovie } from 'src/interfaces/imovie';
import { map } from 'rxjs/operators';

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
}
