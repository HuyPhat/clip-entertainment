import React, {Component} from 'react';
import HeadCustom from '@components/layouts/head';

class CustomElementLoadingBars extends Component {

	render() {
		return (
			<div style={{ margin: '20vw 0 20vw 40vw' }}>
				<HeadCustom />
				<div className='loading-square'>
					<div className='loading__square'></div>
					<div className='loading__square'></div>
					<div className='loading__square'></div>
					<div className='loading__square'></div>
					<div className='loading__square'></div>
					<div className='loading__square'></div>
					<div className='loading__square'></div>
				</div>
			</div>
		);
	}
}

export default CustomElementLoadingBars;
