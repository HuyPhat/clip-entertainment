import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import EntertainmentZoneActions from '@reducers/entertainmentZone.reducer';
import selectors from '../../selectors/index';

import images from '../../images';
import VideoItem from '@components/custom-element/cards/video-item';
import GroupButton from '@components/custom-element/cards/group-button';
import EntertainmentPlaylistSlider from '@components/home/slider/entertainment';
let stringHelper = require('../../text-helper/index');

// ezone, music, entertainment, hot

class EntertainmentZone extends PureComponent {
  componentDidMount() {
    this.props.dispatch(EntertainmentZoneActions.getEntertainmentZoneRequest());
  }

  bigFeature() {
    const featureVideo = this.props.entertainmentZone.data[0].items[0];
    let thumb = '';
    if (_.get(featureVideo, 'thumbnail') === undefined) {
      thumb = (
        featureVideo.thumbnails['maxres'] || featureVideo.thumbnails['medium']
      ).url;
    } else {
      thumb = featureVideo.thumbnail;
    }
    return (
      <div>
        <div>
          <img
            className="fillSize"
            src={thumb}
            onError={e => {
              e.target.src = images.defaultImagePlaceholder;
            }}
          />
        </div>
        <div>
          <h2 className="video-title big-feature-title">
            {stringHelper.truncate(featureVideo.title, 100)}
          </h2>
        </div>
        <div>
          <p className="video-title big-feature-desc">
            {stringHelper.truncate(featureVideo.desc, 205)}
          </p>
        </div>
        <GroupButton
          displayType="orange"
          style1={'button-group'}
          style2={'btn-play-small'}
          videoItem={featureVideo}
        />
      </div>
    );
  }

  smallFeature() {
    const length = this.props.entertainmentZone.data[0].items.length;
    const smallFeatureVideos = this.props.entertainmentZone.data[0].items.slice(
      1,
      length
    );
    return (
      <div>
        {smallFeatureVideos.map((item, index) => {
          return (
            <VideoItem
              key={item.videoID || index}
              videoItem={item}
              size={12}
              titleStyle={'video-title item-white-title'}
              titleStyle1={'white'}
              sizeImg={'size-img'}
            />
          );
        })}
        <style jsx>
          {`
            .spacing {
              height: 86px;
            }
            @media only screen and (min-width: 768px) {
              .spacing {
                height: 30px !important;
              }
            }
          `}
        </style>
      </div>
    );
  }

  render() {
    // console.log(this.props.entertainmentZone);
    if (this.props.entertainmentZone.data.length > 0) {
      return (
        <div className="container pt50" id="entertainment-section">
          <div className="row">
            <Grid item md={12} className="logo-wrapper">
              <div className="line-logo">
                <img
                  ref="categoryLogo"
                  className="landing-logo"
                  src={images.filmLogo}
                />
              </div>
            </Grid>
            <div className="col-md-12 mt30">
              <div className="row">
                <div className="col-md-8 music-left-widget">
                  {this.bigFeature()}
                </div>
                <div className="col-md-4 music-right-widget">
                  {this.smallFeature()}
                </div>
              </div>
            </div>
          </div>
          {this.props.entertainmentZone.data.slice(1).map((slider, idx) => {
            return (
              <EntertainmentPlaylistSlider
                key={slider.id || idx}
                playlistInfo={{ title: slider.title, items: slider.items }}
                zone="hotZoneThumbnailItems"
              />
            );
          })}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  const entertainmentZone = selectors.getEntertainmentZone(state);
  return {
    entertainmentZone
  };
};

export default connect(mapStateToProps)(EntertainmentZone);
