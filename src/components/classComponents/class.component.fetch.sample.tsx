import { Component, ReactNode } from 'react';
import { Todo } from '../../models/todo.model';

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
	// methodlar içerisine parametre alırsa gösterim şekli () => this.onTodoComplete(item.id) olmalıdır.
	onTodoComplete = (id: number) => {
		// yeniden render aldırmalıyız
		const newTodos = this.state.todos.map((item) => {
			if (item.id === id) {
				item.completed = true;
			}

			return { ...item };
		});

		this.setState({ ...this.state, todos: newTodos });
	};

	render(): ReactNode {
		console.log('...rendering-01');
		return (
			<>
				Kayıt SAYISI: {this.state.todos.length}
				<hr></hr>
				{this.state.todos && (
					<ul>
						{this.state.todos.map((item, index) => {
							return (
								<li key={index}>
									{item.title}
									<button
										onClick={() => this.onTodoComplete(item.id)}
										disabled={item.completed}
									>
										{item.completed ? 'Tamamlandı' : 'Tamamlanmadı'}
									</button>
								</li>
							);
						})}
					</ul>
				)}
			</>
		);
	}
}

// Not: Boolean ifadeler JSX dosyasına yansımaz bu sebeple ternaryif kullanarak JSX dosyasına yansımasını sağlarız
// map dışında arayüzleri dinamik olarak çoklayacak başka bir yöntememiz yok
// key ifadesi unutulduğu takdirede program düzgün çalışsada componete bazı performans sorunlarına sebep verebiliyor. map ile dönerken key kullanımını unutmayalım.
// id gibi unique değerleri key bağlayabiliriz. illa index kullanacağıcız diye bir zorunluluk yok key={item.id}
