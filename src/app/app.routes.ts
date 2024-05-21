import { Routes } from '@angular/router';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizDetailComponent } from './components/quiz-detail/quiz-detail.component';

export const routes: Routes = [
	{ path: '', component: QuizListComponent, pathMatch: 'full' },
	{ path: ':id', component: QuizDetailComponent },
];
