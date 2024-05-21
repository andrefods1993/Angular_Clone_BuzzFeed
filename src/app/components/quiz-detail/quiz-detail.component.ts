import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
	selector: 'app-quiz-detail',
	standalone: true,
	imports: [NgFor, NgIf, RouterLink],
	templateUrl: './quiz-detail.component.html',
	styleUrl: './quiz-detail.component.css',
})
export class QuizDetailComponent implements OnInit {
	quizId: number = 0;
	quiz: Quiz | undefined;
	currentQuestionIndex: number = 0;
	answers: string[] = [];
	result: string = '';

	constructor(
		private route: ActivatedRoute,
		private quizService: QuizService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			this.quizId = parseInt(params.get('id') || '', 10);
			this.loadQuiz();
		});
	}
	loadQuiz() {
		this.quizService.getQuizById(this.quizId).subscribe((quiz) => {
			this.quiz = quiz;
		});
	}

	selectAnswer(optionItem: string) {
		this.answers.push(optionItem);
		this.currentQuestionIndex++;
		if (this.quiz && this.currentQuestionIndex >= this.quiz.questions.length) {
			this.calculateResult();
		}
	}

	calculateResult() {
		if (!this.quiz) return;

		const resultCount: { [key: string]: number } = {};
		this.answers.forEach((answer) => {
			if (!resultCount[answer]) {
				resultCount[answer] = 0;
			}
			resultCount[answer]++;
		});

		let maxCount = 0;
		let finalResult = '';
		for (const key in resultCount) {
			if (resultCount[key] > maxCount) {
				maxCount = resultCount[key];
				finalResult = this.quiz.results[key];
			}
		}

		this.result = finalResult;
	}
}
