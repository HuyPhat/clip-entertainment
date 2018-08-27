import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class CustomElementLoadingNotStateStyle01 extends Component {

	render() {
		return (
			<div className="load-wrapp">
	            <div className="load-1">
	                <p>Loading 1</p>
	                <div className="line"></div>
	                <div className="line"></div>
	                <div className="line"></div>
	            </div>
	        </div>
		);
	}
}

CustomElementLoadingNotStateStyle01.propTypes = {
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    hasErrored: state.hasErrored,
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps)(CustomElementLoadingNotStateStyle01);