import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenMovieDatabaseService {

  private static readonly OMDAKey = 'e9648900';

  constructor(
    private httpClient: HttpClient
  ) { }

  movieSearch(q: string): Observable<any> {
    return this.httpClient.get<any>(`https://www.omdbapi.com/?apikey=${OpenMovieDatabaseService.OMDAKey}&s=${q}`);
  }

  catchErrorExample() {
    return this.httpClient.get('some invalid api link here').pipe(
      catchError(err => throwError('This is a custom Exception'))
    );
  }
}
