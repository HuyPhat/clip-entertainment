import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import VideoItem from '@components/video-details/video-item';

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

class RelatedVideoItems extends React.PureComponent {
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
      autoplaySpeed: 2000,
      nextArrow: <NextArrow setClassName="slick-narrow-custom slick-next" />,
      prevArrow: <PrevArrow setClassName="slick-narrow-custom slick-prev" />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
      // afterChange: current => {
      //   console.log('index ->', current);
      //   // this.updateCurrentSlideIndex(current);
      // },
      //   ...this.props.settings
    };
    settings = this.props.autoPlay
      ? {
          ...settings,
          afterChange: current => {
            // this.updateCurrentSlideIndex(current);
          }
        }
      : settings;

    return (
      <div>
        <Slider className={'slick-slider-hotzone'} {...settings}>
          {this.props.playlistInfo.data.map((item, index) => {
            return (
              <VideoItem
                key={item.id}
                videoItem={item}
                displayType="titleInBottom"
                titleStyle="item-white-title"
              />
            );
          })}
        </Slider>
      </div>
    );
  }
}

RelatedVideoItems.propTypes = {
  playlistInfo: PropTypes.object.isRequired,
  autoPlay: PropTypes.bool,
  updateCurrentSlideIndex: PropTypes.func
};

RelatedVideoItems.defaultProps = {
  playlistInfo: null,
  autoPlay: false,
  updateCurrentSlideIndex: () => {}
};

export default RelatedVideoItems;
