import { FormEvent, useEffect, useRef, useState } from 'react';
import { Todo } from '../../models/todo.model';

// 3 farklı durumda otomatik olarak useEffect Hook tetiklenir
// 1. component render dan sonra ilk doma basıldığında
// 2. component bir useState hook ile state güncellendiğinde
// 3. component domdan ayrıldığında (visible, sayfalar arası geçişi)

// bir function component içinde birden fazla useEffect Hook kullanılabilir.

type State = {
	todos: Todo[]; // referans güncellem üzerinden useState nasıl kullanıyoruz.
};

function UseEffectHookSample() {
	const [state, setState] = useState<State>({ todos: [] });

	const loadDataAsync = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
		const data = await response.json();
		setState({ ...state, todos: data });
	};
	// useEffect hook içinde component lifecycle methodlarında olduğu gibi await ile kod yazamıyoruz. fakat async yazılımış kodları çağırmayı destekliyor.
	useEffect(() => {
		// component açıldığından api dan veri çekme işlem vs varsa en doğru yer burasıdır.
		console.log('return dan sonra ilk olarak buraya düşer');
		loadDataAsync();

		return () => {
			// clean up function componentwillunmount lifecyle methoda denk gelir.
			console.log('component domdan çıkarken tetiklenir');
		};
	}, []); // [] hangi stateler useEffect hook ile takibe alınsın. state takibi yok
	useEffect(() => {
		console.log(
			'state ilk olarak init edildiğinde veya state değiştiğinde çalışır'
		);
	}, [state]);

	const onDeleteItem = (id: number) => {
		const ok = window.confirm('Kaydı silmek istediğinize emin misiniz?');
		if (ok) {
			setState({ ...state, todos: state.todos.filter((x) => x.id !== id) });
		}
	};

	// useRef ile input elementlerin yada html elementlerin güncell text veya value değerlerini html referans olarak ulaşabiliriz.
	// document.getElementById('inpt1').value;
	const inputTitle = useRef<HTMLInputElement>(null);
	const inputCompleted = useRef<HTMLInputElement>(null);

	const onFormSubmit = (event: FormEvent) => {
		event.preventDefault(); // Formun post olmasını engelle
		const data: Todo = {
			id: state.todos.length + 1,
			userId: state.todos.length + 1,
			completed: inputCompleted.current?.checked,
			title: inputTitle.current?.value || '',
		};

		setState({ ...state, todos: [data, ...state.todos] });

		// form bilgilerini temizledik

		if (inputTitle.current) {
			inputTitle.current.value = '';
		}

		if (inputCompleted.current) {
			inputCompleted.current.checked = false;
		}
	};

	return (
		<>
			<form method="post" onSubmit={onFormSubmit}>
				<label>Title : </label>
				<input ref={inputTitle} type="text" />
				<br></br>
				<label>Completed :</label>
				<input ref={inputCompleted} type="checkbox" />
				<br></br>
				<input type="submit" value="Ekle" />
			</form>

			{state.todos && (
				<>
					<table style={{ width: '100%' }} border={1}>
						<tr>
							<th>Title</th>
							<th>Completed</th>
							<th>Actions</th>
						</tr>

						{state.todos.map((item, index) => {
							return (
								<tr
									style={{
										backgroundColor: item.completed ? 'green' : 'yellow',
									}}
									key={item.id}
								>
									<td>{item.title}</td>
									<td>{item.completed ? 'Yapıldı' : 'Yapılmadı'}</td>
									<td>
										<button onClick={() => onDeleteItem(item.id)}>Sil</button>
										<button>Düzenle</button>
									</td>
								</tr>
							);
						})}
					</table>
				</>
			)}
		</>
	);
}

export default UseEffectHookSample;
