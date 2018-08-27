import React, {Component} from 'react';
import ScrollToTop from 'react-scroll-up';
import FontAwesome from 'react-fontawesome';

class CustomElementScrollTop extends Component{

	render(){
		return (
			<ScrollToTop showUnder={100}>
				<div className="go-top">{<FontAwesome name='arrow-up'/>}</div>
	        </ScrollToTop>
		);
	}

}

export default CustomElementScrollTop;