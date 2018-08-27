import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as _ from 'lodash';

class CustomElementLoadingPage extends Component {

	handleIsLoading(){
		var el = null;
		if(!_.isUndefined(this.props.isLoading) && this.props.isLoading.loading) {
			el = (
				<div className="loading">
					<div>
					    <div className="c1"></div>
					    <div className="c2"></div>
					    <div className="c3"></div>
					    <div className="c4"></div>
					</div>
				</div>
			);
		}

		return el;
	}

	render() {
		return (
			<div>
				{ this.handleIsLoading() }
			</div>
		);
	}
}

CustomElementLoadingPage.propTypes = {
    isLoading: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading
	};
};

export default connect(mapStateToProps)(CustomElementLoadingPage);
