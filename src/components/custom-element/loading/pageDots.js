import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';

class CustomElementLoadingPageDots extends Component {

	handleIsLoading(){
		var el = null;

		if(this.props.isLoading){
			el = (
				<div id="page-loading">
					<div className="three-balls">
					    <div className="ball ball1"></div>
					    <div className="ball ball2"></div>
					    <div className="ball ball3"></div>
					</div>
				</div>
			);
		}

		return el;
	}

	render() {
		return (
			<div>
				{this.handleIsLoading()}
			</div>
		);
	}
}

CustomElementLoadingPageDots.propTypes = {
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    hasErrored: state.hasErrored,
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps)(CustomElementLoadingPageDots);
