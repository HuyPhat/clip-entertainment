import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import images from '../../images';

/* Actions */
import MusicZoneActions from '../../reducers/musicZone.reducer';
import selectors from '../../selectors/index';

/* Components */
import VideoItem from '@components/custom-element/cards/video-item';
import EntertainmentPlaylistSlider from '@components/home/slider/entertainment';
import GroupButton from '@components/custom-element/cards/group-button';
let stringHelper = require('../../text-helper/index');

/* Music Zone */
class MusicZone extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(MusicZoneActions.getMusicZoneRequest());
  }

  bigFeature() {
    // console.log(this.props.musicZone.data);
    const featureVideo = this.props.musicZone.data[0].items[0];
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
        <div className="wrap-img-big">
          <img
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
    // console.log(this.props.musicZone.data[0]);
    // this.props.musicZone.data[0].items'
    const length = this.props.musicZone.data[0].items.length;
    const smallFeatureVideos = this.props.musicZone.data[0].items.slice(
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
        <style less>
          {`
			.size-img {
				width: 306px;
				height: 170px;
				background-size: cover;
				background-repeat: no-repeat;
				background-position: center center;
			}

			.size-img img {
				width: 100%;
			}
			@media  screen and (max-width: 991px) {
				.size-img {
					width: 100%;
					height: 350px;
				}
			}
			@media  screen and (max-width: 414px) {
				.size-img {
					width: 100%;
					height: 240px;
				}
			}
        	`}
        </style>
      </div>
    );
  }

  render() {
    // console.log('music: ', this.props.musicZone);
    if (this.props.musicZone.data.length > 0) {
      return (
        <div className="container pt20" id="music-section">
          <div className="row">
            <Grid item md={12} className="logo-wrapper">
              <div className="line-logo">
                <img
                  ref="categoryLogo"
                  className="landing-logo"
                  src={images.musicLogo}
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
          {this.props.musicZone.data.slice(1).map((slider, idx) => {
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
  const musicZone = selectors.getMusicZone(state);
  return {
    musicZone
  };
};

export default connect(mapStateToProps)(MusicZone);
