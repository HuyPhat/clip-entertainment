import React, {Component} from 'react';
import HeadCustom from '@components/layouts/head';

class CustomElementLoadingLogo extends Component {

	componentWillMount() {
	    
	}

	componentDidMount() {
		if(this.props.callback) {
			window.location.assign(this.props.callback);
		}
	}

	render() {
		return (
			<div className="loading row">
				<HeadCustom />
				<div>
					<div className="c1"></div>
				    <div className="c2"></div>
				    <div className="c3"></div>
				    <div className="c4"></div>
				</div>
				<div className="col-md-12">
					<center style={{ marginTop: '-90px' }}>
					    <img className="img-responsive" src="https://cdn.popsww.com/popskids/webapp/images/logo-popskid.png" />
				    </center>
				</div>
			</div>
		);
	}
}

export default CustomElementLoadingLogo;
