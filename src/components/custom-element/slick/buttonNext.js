import React, {Component} from 'react';
import Slider from 'react-slick';

class CustomElementSlickButtonNext extends Component{
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}

	next() {
    	Slider.slickNext()
	}

  	previous() {
    	Slider.slickPrev()
	}

	render(){
		return (
			<button className="slick-arrow slick-next slick-next-custom" onClick={this.next}> Next</button>
		);
	}
}

export default CustomElementSlickButtonNext;