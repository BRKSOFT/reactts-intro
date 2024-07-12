import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ClassComponentSample } from './components/ClassComponentSample';

type Props = {};

type State = { title: string; visible: boolean };
class App extends Component<Props, State> {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: Props) {
		super(props);
		this.state = { title: '', visible: true };
	}

	onInputChange = (event: any) => {
		console.log('event', event);
		this.setState({ title: event.target.value });
	};

	onToggleButton = () => {
		// this.setState({ visible: false, title: this.state.title });
		this.setState({ ...this.state, visible: !this.state.visible });
	};

	render(): React.ReactNode {
		return (
			<div
				className="App"
				style={{ padding: '2rem', background: 'yellow', color: 'blueviolet' }}
			>
				<input onChange={this.onInputChange} />
				<hr></hr>
				<button onClick={this.onToggleButton}>Toggle </button>
				<hr></hr>
				Visible State: {this.state.visible ? <>Visible</> : <>Not Visible</>}
				<hr />
				{this.state.visible && (
					<ClassComponentSample title={this.state.title} />
				)}
				<ClassComponentSample title="Component-2" content="İçerik-2" />
			</div>
		);
	}
}

export default App;
