import { useState } from 'react';
import CounterComponent from './components/functionComponents/counter.sample';
import UseEffectHookSample from './components/functionComponents/useeffect.hook.sample';

function AppFunc() {
	const [count, setCount] = useState<number>(0);
	const [visible, setVisible] = useState<boolean>(true);

	const onToggle = () => {
		setVisible(!visible); // true iken false, false iken true yap
	};

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
			{/* <div>
				<h3>Parent Component</h3>
				<button onClick={onCountChange}>Change Count</button>
			</div>
			<hr></hr>
			<CounterComponent count={count} onRandomChange={onRandomChange} /> */}

			<button onClick={onToggle}>onToggle</button>
			<hr></hr>
			{visible && <UseEffectHookSample />}
		</>
	);
}

export default AppFunc;
