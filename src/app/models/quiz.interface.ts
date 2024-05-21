export interface Quiz {
	id: number;
	title: string;
	description: string;
	img: string;
	questions: Question[];
	results: Result;
}

export interface Question {
	question_id: number;
	questionText: string;
	options: Option[];
}

export interface Option {
	answerText: string;
	optionItem: string;
}

export interface Result {
	[key: string]: string | any;
}
