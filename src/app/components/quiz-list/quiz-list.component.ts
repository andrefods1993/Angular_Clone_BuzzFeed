import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.interface';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-quiz-list',
	standalone: true,
	imports: [NgFor, RouterLink],
	templateUrl: './quiz-list.component.html',
	styleUrl: './quiz-list.component.css',
})
export class QuizListComponent implements OnInit {
	quizzes: Quiz[] = [];

	constructor(private quizService: QuizService) {}

	ngOnInit(): void {
		this.loadQuizzes();
	}

	loadQuizzes() {
		this.quizService.getQuizzes().subscribe((quizzes) => {
			this.quizzes = quizzes.map((quiz) => {
				quiz.img = quiz.img.startsWith('assets/images/')
					? quiz.img
					: `assets/images/${quiz.img}`;
				return quiz;
			});
		});
	}
}
