import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Paper} from 'material-ui';
import LazyLoad from 'react-lazy-load';

class CustomElementSlickItem extends Component{

  constructor(props) {
    super(props);
    this.config = {
      'title': 'None',
      'lengthTitle': '100',
      'separatorTitle': ' ',
      'omissionTitle': ' ...',
      'link': '/',
      'thumbnail': 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png'
    };
  }

	render(){
		return (
      <div className="card-custom-slick">
        <LazyLoad height="100%">
          <div className="card-header img-slick" style={{ 
              backgroundImage: `url(${(this.props.thumbnail) ? this.props.thumbnail: this.config.thumbnail})` }}>
          </div>
        </LazyLoad>
        <h5 style={{
            width: (this.props.width) ? this.props.width : this.config.width }}>
          {_.truncate((this.props.title) ? this.props.title : this.config.title,{
            'length': (this.props.lengthTitle) ? this.props.lengthTitle : this.config.lengthTitle,
            'separator': (this.props.separatorTitle) ? this.props.separatorTitle : this.config.separatorTitle,
            'omission': (this.props.omissionTitle) ? this.props.omissionTitle : this.config.omissionTitle
          })}
        </h5>
      </div>
		);
	}
}

export default CustomElementSlickItem;