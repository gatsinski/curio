import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from './questions/question';
import { QuestionService } from './questions/question.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

    questions: Question[] = [];
    answerInlines: Array<Number> = [4, 4, 4];

    constructor(
        private questionService: QuestionService,
        private _router: Router
    ) {
        this.answerInlines = Array(5).fill(0); // [0,0,0,0,0]
    }

    ngOnInit(): void {
        this.questionService.getQuestions()
        .then(questions => this.questions = questions);
    }

    add(text: string): void {
        text = text.trim();
        if (!text) {
            return;
        }

        this.questionService.create(text).then(question => {
            this.questions.push(question);
        });

    }

    delete(question: Question): void {
        this.questionService
            .delete(question.id)
            .then(() => {
                this.questions = this.questions.filter(h => h !== question);
        });
    }

    gotoDetail(question: Question): void {
        this._router.navigate(['/question', question.id]);
    }

}
