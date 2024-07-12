import { useEffect, useState } from 'react';

type Props = {
	count: number; // Input
	onRandomChange: (count: number) => void; // Output
};

function CounterComponent({ count, onRandomChange }: Props) {
	// setState kullanılmadığında kendimize component arayüzünü güncelleyek bir state tanımı açıyoruz.
	const [countState, setCountState] = useState<number>(count);
	const [random, setRandom] = useState<number>(10);
	// value type bir değer. value değişince virtual domdan dolayı yeniden render.// countState getter,// setCountState setter.
	const onIncrement = () => setCountState(countState + 1);
	const onReset = () => setCountState(0);
	const onDecrement = () => setCountState(countState - 1);
	console.log('...rendering', count);

	useEffect(() => {
		setCountState(count);
	}, [count]);

	const onRandomNumber = () => {
		const number = Math.round(Math.random() * 1000);
		setRandom(number);
		// event fırlatma yöntemi
		// child component state değişiminde parent component haberdar etmek istersek yada parent component bu state değişimine yakalamaya ihtiyacı varsa kullanılan bir teknik.
		onRandomChange(number);
	};

	// render method return işinden çalışır
	return (
		<>
			<h1>Child Component</h1>
			<hr></hr>
			<p>Sayac: {countState}</p>

			<button onClick={onIncrement}>(+)</button>
			<button onClick={onReset}>Reset</button>
			<button onClick={onDecrement}>(-)</button>
			<hr></hr>
			<button onClick={onRandomNumber}>Generate Random Number</button>
			<p>Random: {random}</p>
		</>
	);
}
export default CounterComponent;

// function CounterComponent2(props: Props) {
// 	// render method return işinden çalışır
// 	return <>{props.count}</>;
// }

// Function vs Class Component
// this keyword kullanımı yok
// lifecycle method yok, bunun yerine özel function olan Hook function var
// render method yok return yazmak yeterli
// setState denilen bir method function componentlere yok.
// class içinde let const gibi değişken tanımları yok. function componentlere let const ile değişken tanımı yapılır ve method yerine arrow function kullanılır
// class componentlerde olduğu gibi event binding işleminde bind(this) tanılamasına gerek yok
// function componentlerde extend Component yok. çünkü function componentlerde kalıtım yok
// function componentlerde constructor super gibi keywordler yok.

// Önemli Hooklar sadece function body içinde tanımlanır, ana component body dışında bir function içine tanımlanamaz.
