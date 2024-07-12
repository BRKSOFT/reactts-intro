import { useState } from 'react';
import CounterComponent from './components/functionComponents/counter.sample';

function AppFunc() {
	const [count, setCount] = useState<number>(0);

	const onCountChange = () => {
		setCount(Math.round(Math.random() * 100));
	};

	const onRandomChange = (random: number) => {
		console.log('random değişti' + random);
		if (random % 2 === 0) {
			alert('Random Değeri Çift');
		}
	};

	return (
		<>
			<div>
				<h3>Parent Component</h3>
				<button onClick={onCountChange}>Change Count</button>
			</div>
			<hr></hr>
			<CounterComponent count={count} onRandomChange={onRandomChange} />
		</>
	);
}

export default AppFunc;
