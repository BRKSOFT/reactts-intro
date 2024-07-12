import { Component, ReactNode } from 'react';

// state ve props çalışma

// Props: Componentin ilk doma hangi değerler ile basılacağını belirliğimiz özellikler.

// typescript de props tanımı componente özgüdür. sadece ilgili component için kullanılır. Bu sebeple interface yerine Type tipi kullanımı tercih edilir.

type Props = {
	title: string;
	content?: string; // opsiyonel
};

// Kullanıcının etkileşimi sonrası değişiecek değerlere ait bir state modeli açıyoruz.
type State = {
	count: number;
	title: string;
};

export class ClassComponentSample extends Component<Props, State> {
	// class componentlerde ilk çalışan method

	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: Props) {
		// classComponent kullanıyorsak propsdan değer okumak için bu şekilde bir kod bloğu yazmalıyız.
		super(props);
		// state ilk initial değeri props üzerinden aktarabiliriz.
		this.state = { count: 0, title: this.props.title };
		// componente ait local durum yönetimin ilk değerlerini constructor başlatmış olduk.
		this.click = this.click.bind(this);
		// methodların içerisinde bir setState tanımı varsa method class contrductordan event gibi çalışması içişn tanımlıyoruz.
	}

	// event binding
	click() {
		alert('Clicked');
		// Not: React da props değeri set edilemiyor. Bu durumda ekranda title değerinin değişimini kullanıcının etkileşimi sonrasında yapmak için state denen kavrama ihtiyacım var.
		// this.props.title = 'Tıklandı'; yanlış kullanım

		// this.state.count = this.state.count + 1;
		// state deki bir değeri direkt erişim yaparak değiştirmek mümkün değil. state değerleride readonly yazılmış.

		this.setState({ count: this.state.count + 1, title: this.state.title });
		// state yeni referans aldığı için state güncellendi.
	}

	// arrow function formatında yazarsak callback yapabildiğinde dolayı this.click = this.click.bind(this); koda ihtiyaç kalmaz.
	click2 = () => {
		this.setState({ ...this.state, count: this.state.count + 1 }, () => {
			console.log('state değişti');
		});
	};

	// component ilk açılışında apidan veri çekme işlemleri burada yapılır
	componentDidMount(): void {
		console.log('render sonra çalışan ilk method');
	}

	// 2. faz statechange - tekrardan render alır. re-render işlemi gerçekleşir.
	componentDidUpdate(
		prevProps: Readonly<Props>,
		prevState: Readonly<State>,
		snapshot?: any
	): void {
		console.log(
			'component did mount sonrası çalışır compoennt state veya propsların değişim anını yakalar',
			prevProps,
			prevState,
			this.state
		);
	}

	// 3.faz unmount
	componentWillUnmount(): void {
		console.log(
			'component sayfadan ayrıldığında tetiklenir. Component domdan ayrılır'
		);
	}

	// render phase
	render(): ReactNode {
		console.log('...rendering');
		return (
			<>
				{/* model binding */}

				<h1>Props Title: {this.props.title}</h1>
				<p>{this.props.content}</p>
				<button onClick={this.click}>Click Me</button>
				<button onClick={this.click2}>Click Me 2</button>
				<hr></hr>
				<p>Sayac: {this.state.count}</p>
			</>
		);
	}
}
