// Not: Apidan gelen giden herbir dto bizim için frontend tarafında açılacak bir interface modelidir.

export interface Todo {
	userId: number;
	id: number;
	title: string;
	completed?: boolean;
}

// const todo: Todo = { userId: 1, id: 1, title: 'A' };
