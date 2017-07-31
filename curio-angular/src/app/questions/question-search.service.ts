import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Question } from './question';

@Injectable()
export class QuestionSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Question[]> {
    return this.http
        .get(`http://localhost:8000/api/questions/?text=${term}`)
        .map(response => response.json() as Question[]);
  }
}
