import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, takeUntil, skip } from 'rxjs';
import { OpenMovieDatabaseService } from 'src/app/services/open-movie-database.service';

@Component({
  selector: 'app-typing-search',
  templateUrl: './typing-search.component.html',
  styleUrls: ['./typing-search.component.scss']
})
export class TypingSearchComponent implements OnInit {

  contentSearch = '';
  term$ = new BehaviorSubject<string>('');
  results$ = this.term$.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(term =>
      this.openMovieService.movieSearch(term)
        .pipe(
          takeUntil(
            this.term$.pipe(skip(1))
          )
        )
    )
  )

  constructor(
    private openMovieService: OpenMovieDatabaseService
  ) { }

  ngOnInit(): void {
    this.openMovieService.catchErrorExample().subscribe(res => {
      console.log('Response', res);
    }, error => {
      console.log('Error comes here', error);
    });
  }

  onSubmit() {
    console.log(this.contentSearch);
    this.term$.next(this.contentSearch);
  }

}
