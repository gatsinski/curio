import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';
import { Answer } from './answer';
import { StateService } from '../shared/state.service';


@Injectable()
export class QuestionService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private questionsURL = this.stateService.apiBaseUrl + 'questions/';

    constructor(
        private http: Http,
        private stateService: StateService
    ) { }

    getQuestions(): Promise<Question[]> {
        return this.http.get(this.questionsURL)
            .toPromise()
            .then(response => response.json() as Question[])
            .catch(this.handleError);
    }

    getAnswers(question): Promise<Answer[]> {
        const apiUrl = this.stateService.apiBaseUrl + `answers/?question=${question}`;
        return this.http
            .get(apiUrl)
            .toPromise()
            .then(response => response.json() as Answer[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getQuestion(id: number): Promise<Question> {
        const url = `${this.questionsURL}${id}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Question)
            .catch(this.handleError);
    }

    update(question: Question): Promise<Question> {
        const url = `${this.questionsURL}${question.id}/`;
        return this.http
            .put(url, JSON.stringify(question), {headers: this.headers})
            .toPromise()
            .then(() => question)
            .catch(this.handleError);
    }

    create(text: string): Promise<Question> {
        return this.http
            .post(this.questionsURL, JSON.stringify({text: text}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Question)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.questionsURL}${id}/`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

}
