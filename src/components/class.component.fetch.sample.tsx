import { Component, ReactNode } from 'react';
import { Todo } from '../models/todo.model';

type Props = {};

type State = {
	todos: Todo[];
};

export class ClassComponentFetchSample extends Component<Props, State> {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: Props) {
		super(props);
		this.state = { todos: [] };
	}

	loadDataAsync = async () => {
		try {
			// resolve olduğu an
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/todos'
			);
			const data = await response.json();
			console.log('data2', data);
			this.setState({ ...this.state, todos: data });
		} catch (error) {
			// reject olduğu an
		}
	};

	componentDidMount(): void {
		console.log('...init state-01');
		this.loadDataAsync();
	}
	// fetch('https://jsonplaceholder.typicode.com/todos')
	// 	.then((response) => {
	// 		console.log('response', response);
	// 		return response.json(); // fetch kullanırsak response stream olarak gelir ama bize json tipi lazım o yüzden response streamden json parse ediyoruz
	// 	})
	// 	.then((data) => {
	// 		// json dönmüş data var
	// 		console.log('data', data);
	// 		this.setState({ ...this.state, todos: data });
	// 	})
	// 	.catch((err) => {
	// 		console.log('err', err);
	// 	});

	// Not lifecycle methodlar içersinde async await gibi kodlar yazamasak da async bir method çağırabiliriz.

	render(): ReactNode {
		console.log('...rendering-01');
		return <>Kayıt SAYISI: {this.state.todos.length}</>;
	}
}
