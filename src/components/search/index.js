import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import LayoutsHeader from '@components/layouts/header';
import CustomElementListItemVideoGrid from '@components/custom-element/list/item-video-grid';
import CustomElementLoadingLogo from '@components/custom-element/loading/logo';
import { Actions } from '@popskids-core';
import { Link } from '@routes';

import slug from 'slug';
import * as _ from 'lodash';

class SearchIndex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			typingTimeOut: 0,
		};
		this.handleInputSearchChange = this.handleInputSearchChange.bind(this);
	}

	componentWillMount(){
		this.props.dispatch(Actions.searchVideos({text: ''}));
	}

	handleInputSearchChange(e) {
		const value = e.target.value;
		this.setState({
			'text': value
		});

		if(this.state.typingTimeOut) {
			clearTimeout(this.state.typingTimeOut);
		}

		this.setState({
			typingTimeOut: setTimeout((e) => {
				this.props.dispatch(Actions.searchVideos({
					text: this.state.text
				}));
			}, 1000)
		});

	}

	renderVideoList() {
		var el = (
			<CustomElementLoadingLogo />
		);

		if(!_.isUndefined(this.props.videos)) {
			var videos = this.props.videos.data;
			el = (
				<div>
					<LayoutsHeader
						position="fixed"
						classHeader="bg-color-white"
						btnMenu={ false } 
						showBtnSearch={ false }
						showInputSearch= { true }
						inputSearchChange= { this.handleInputSearchChange }
					/>
					<Grid className="mt70 pl5 pr5" container spacing={8}>
						{
							videos.map((video) => 
								<Grid item xs={6} sm={6} md={4} key={ video.id } className="border-radius-default">
									<CustomElementListItemVideoGrid 
										video={ video }
										classCardMedia="img-responsive border-radius-default"
									/>
								</Grid>
							)
						}
					</Grid>
					{
						(videos.length > 8)
						?
							<div className="search-footer-bg">
								<img className="img-responsive" src="https://cdn.popsww.com/popskids/webapp/images/bg/search_footer_bg_normal.png" />
							</div>
						:
							<div className="search-footer-bg">
								<img className="img-responsive fixed" src="https://cdn.popsww.com/popskids/webapp/images/bg/search_footer_bg_normal.png" />
							</div>
					}
				</div>
			);
		}
		return el;
	}

	render(){
		return (
			this.renderVideoList()
		);
	}


}

const mapStateToProps = (state) => {
	return {
		videos: state.videosSearch
	};
};

export default connect(mapStateToProps)(SearchIndex);