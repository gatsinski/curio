// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { QuestionService } from './question.service';
import { Question } from './question';
import { Answer} from './answer';

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: [ './question-detail.component.css' ]
})
export class QuestionDetailComponent implements OnInit {
  @Input() question: Question;
  private _answers: Array<Answer>;
  private selectedAnswer: Answer;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.questionService.getQuestion(+params.get('id')))
      .subscribe(question => this.question = question);

    this.route.paramMap
      .switchMap((params: ParamMap) => this.questionService.getAnswers(+params.get('id')))
      .subscribe(answers => this._answers = answers);

  }

  goBack(): void {
    this.location.back();
  }

  submitAnswer(form): void {
    let i = 0;
    for (i = 0; i < this._answers.length; i++) {
      if (this._answers[i].id == form.value.answer) {
        this.selectedAnswer = this._answers[i];
      }
   }
    console.log(form);
  }

}
