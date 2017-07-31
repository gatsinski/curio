import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Question } from './question';
import { QuestionService } from './question.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: [ './questions.component.css' ]
})
export class QuestionsComponent implements OnInit {
  // List of questions
  questions: Question[];

  constructor(
    private router: Router,
    private questionService: QuestionService) { }

  getQuestions(): void {
    this.questionService.getQuestions().then(questions => this.questions = questions);
}

  ngOnInit(): void {
    this.getQuestions();
  }

  gotoDetail(question: Question): void {
    this.router.navigate(['/question', question.id]);
  }
}
