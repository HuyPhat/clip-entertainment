import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import VideoItem from '@components/custom-element/cards/video-item';

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

class EntertainmentPlaylistSlider extends React.Component {
	constructor(props) {
		super(props);
		this.settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow:
				props.playlistInfo.items.length < 4
					? props.playlistInfo.items.length
					: 4,
			slidesToScroll:
				props.playlistInfo.items.length < 4
					? props.playlistInfo.items.length
					: 4,
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
			]
		};
	}

	renderTitle() {
		if (this.props.displayType != 'nonTitle') {
			return (
				<Grid item md={12}>
					<h4 className="title-slider">{this.props.playlistInfo.title}</h4>
					<style less>
						{`
            h4 {
              color: #fff;
              font-family: 'Roboto', sans-serif;
              font-size: 18px;
              font-weight: 400;
              margin-top: 30px;
              margin-bottom: 30px;
            }
          `}
					</style>
				</Grid>
			);
		} else {
			return null;
		}
	}

	render() {
		// console.log(this.props.playlistInfo);
		return (
			<div className="wrap-carousel-slider">
				{this.renderTitle()}
				<Slider {...this.settings}>
					{this.props.playlistInfo.items.map((video, index) => {
						return (
							<VideoItem
								key={video.id || index}
								videoItem={video}
								titleStyle={'item-white-title'}
								displayType={'titleInMiddle'}
								size={3}
								zone={this.props.zone}
							/>
						);
					})}
				</Slider>
			</div>
		);
	}
}

EntertainmentPlaylistSlider.propTypes = {
	playlistInfo: PropTypes.shape({
		title: PropTypes.string,
		items: PropTypes.array
	}).isRequired,
	displayType: PropTypes.oneOf(['titleInTop', 'nonTitle'])
};

EntertainmentPlaylistSlider.defaultProps = {
	displayType: 'titleInTop'
};

export default EntertainmentPlaylistSlider;
