import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Quiz } from '../models/quiz.interface';
import quizzesData from '../../assets/data/quizzes.json';

@Injectable({
	providedIn: 'root',
})
export class QuizService {
	private quizzes: Quiz[] = quizzesData;

	constructor() {}

	getQuizzes(): Observable<Quiz[]> {
		return of(this.quizzes);
	}

	getQuizById(id: number): Observable<Quiz | undefined> {
		return of(this.quizzes.find((quiz) => quiz.id === id));
	}
}
