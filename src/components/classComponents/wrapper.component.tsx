// <Row><Col size={5} /></Row>

import React, { Component, ReactNode } from 'react';

// children özel bir kelime ReactNode tipinde olmalı bu sayede react bunun component içine geçilen bir değer olduğunu anlıyor
type Props = {
	children?: ReactNode; // element var olan bir component de geçilebilir.
	styles?: React.CSSProperties;
};
// State olmayan componentlere Pure Component ismi veriyoruz. Genelde UI Kit ile uygulamada bir çok yerde ihtiyaç duyacağımız arayüz componentleridir.
class WrapperComponent extends Component<Props> {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: Props) {
		super(props);
	}

	render(): ReactNode {
		return <div style={this.props.styles}>{this.props.children}</div>;
	}
}

export default WrapperComponent;
