import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import CustomElementPlaylistSliderItem from '@components/custom-element/playlist/playlist-slider';
import CarouselHotZone from './carousel-hot-zone';
import PageZoneActions from '../../reducers/hotZone.reducer';
import selectors from '../../selectors/index';

// ezone, music, entertainment, hot

class HotZone extends React.PureComponent {
  state = {
    currentSlideIndex: 0
  };

  settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    speed: 500
  };

  componentDidMount() {
    this.props.dispatch(PageZoneActions.getPageZoneRequest());
  }

  clickThumbnailItem = videoIndex => {
    this.setState({ currentSlideIndex: videoIndex });
  };

  render() {
    const { currentSlideIndex } = this.state;
    const { hotZone, hasHotZoneVideos } = this.props;
    const playlist = hasHotZoneVideos && hotZone.data[0].items;
    if (this.props.hotZone.data.length > 0) {
      return (
        <div className="hotZone-container">
          <div className="big-carousel">
            <CarouselHotZone
              className="background-img"
              playlist={playlist}
              currentSlideIndex={currentSlideIndex}
            />
          </div>
          <Grid container alignItems="center" direction="row" justify="center">
            <div className="slider-hotzone container">
              <CustomElementPlaylistSliderItem
                displayType="nonTitle"
                playlistInfo={{ data: playlist }}
                clickThumbnailItem={this.clickThumbnailItem}
                settings={{ className: 'slick-slider-hotzone' }}
                zone="hotZoneThumbnailItems"
                autoPlay={true}
                currentSlideIndex={currentSlideIndex}
              />
            </div>
          </Grid>
          <style jsx>{`
            .slider-hotzone {
              position: absolute;
              bottom: 50px;
            }
            .background-img {
              position: absolute;
              top: 0px;
            }
            @media only screen and (max-width: 768px) {
              .slider-control-bottomcenter {
                bottom: 20px !important;
              }
              .hotZone-container {
              }
            }
          `}</style>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  const hotZone = selectors.getHotZone(state);
  const hasHotZoneVideos = hotZone.data[0] && hotZone.data[0].items;
  return {
    hotZone,
    hasHotZoneVideos
  };
};

export default connect(mapStateToProps)(HotZone);
