import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ClassComponentSample } from './components/ClassComponentSample';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
			<div>
				<ClassComponentSample title="ClassComponent" />
				<hr />
				<ClassComponentSample title="Component-2" content="İçerik-2" />
			</div>
		</div>
	);
}

export default App;
