import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import VideoItem from '@components/custom-element/cards/video-item';

import Router from 'next/router';
const mockedRouter = { push: () => { } };
Router.router = mockedRouter;

function NextArrow(props) {
	const { setClassName, style, onClick } = props;
	return (
		<div className={setClassName} style={{ ...style }} onClick={onClick} />
	);
}

function PrevArrow(props) {
	const { setClassName, style, onClick } = props;
	return (
		<div className={setClassName} style={{ ...style }} onClick={onClick} />
	);
}

class CustomElementPlaylistSliderItem extends React.PureComponent {
	// currentSlideIndex={currentSlideIndex}

	renderTitle() {
		if (this.props.displayType != 'nonTitle') {
			return (
				<Grid item md={12}>
					<h4>{this.props.playlistInfo.title}</h4>
					<br />
					<style less>
						{`
            h4 {
              color: #fff;
            }
          `}
					</style>
				</Grid>
			);
		} else {
			return null;
		}
	}

	updateCurrentSlideIndex = videoIndex => {
		this.props.clickThumbnailItem(videoIndex);
	};

	render() {
		let settings = {
			dots: false,
			cssEase: 'linear',
			slidesToShow:
				this.props.playlistInfo.data.length > 4
					? 4
					: this.props.playlistInfo.data.length,
			slidesToScroll: 1,
			infinite: true,
			autoplay: this.props.autoPlay,
			autoplaySpeed: 9000,
			nextArrow: <NextArrow setClassName="slick-narrow-custom slick-next" />,
			prevArrow: <PrevArrow setClassName="slick-narrow-custom slick-prev" />,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						centerMode: true,
						infinite: true,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
						infinite: true
					}
				}
			],
			// afterChange: current => {
			//   console.log('index ->', current);
			//   // this.updateCurrentSlideIndex(current);
			// },
			...this.props.settings
		};
		settings = this.props.autoPlay
			? {
				...settings,
				afterChange: current => {
					this.updateCurrentSlideIndex(current);
				}
			}
			: settings;
		return (
			<div>
				{this.renderTitle()}
				<Slider ref={slider => (this.slider = slider)} {...settings}>
					{this.props.playlistInfo.data.map((videoItem, index) => {
						return (
							<VideoItem
								key={videoItem.id || index}
								displayType={'titleInMiddle'}
								videoItem={videoItem}
								videoIndex={videoItem.videoId || index}
								size={3}
								titleStyle={'item-white-title'}
								updateCurrentSlideIndex={this.updateCurrentSlideIndex}
								displayZone={this.props.displayZone}
								zone={this.props.zone}
								className={
									this.props.currentSlideIndex === index ? 'sl-current' : ''
								}
							/>
						);
					})}
				</Slider>
			</div>
		);
	}
}

CustomElementPlaylistSliderItem.propTypes = {
	playlistInfo: PropTypes.object.isRequired,
	displayType: PropTypes.oneOf(['titleInTop', 'nonTitle']),
	updateCurrentSlideIndex: PropTypes.func,
	displayZone: PropTypes.oneOf(['hot', 'ezone', 'music', 'entertainment']),
	autoPlay: PropTypes.bool
};

CustomElementPlaylistSliderItem.defaultProps = {
	displayType: 'titleInTop',
	updateCurrentSlideIndex: () => { },
	autoPlay: false
};

export default CustomElementPlaylistSliderItem;
