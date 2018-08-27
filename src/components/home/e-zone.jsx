import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import EZoneActions from '../../reducers/eZone.reducer';
import selectors from '../../selectors/index';

import CustomElementPlaylistSliderItem from '@components/custom-element/playlist/playlist-slider';
import EZoneBigThumbnail from '@components/layouts/EZoneBigThumbnail';
import EZoneFeatureList from '@components/layouts/EZoneFeatureList';
// import ZoneContext from '@components/context/zone/index';

// const checkHotZoneData = input => {
//   // maxres, medium, high
//   let maxResVidCount = 0;
//   let highResVidCount = 0;
//   let medResVidCount = 0;
//   let totalVids = 0;
//   for (let i = 0; i < input.length; i++) {
//     totalVids += input[i].items.length;
//     _.each(input[i].items, function(video) {
//       _.each(video.thumbnails, function(value, key) {
//         if (key === 'maxres') {
//           maxResVidCount++;
//         } else if (key === 'medium') {
//           medResVidCount++;
//         } else if (key === 'high') {
//           highResVidCount++;
//         } else {
//           console.log('key: ', key);
//         }
//       });
//     });
//   }
//   // console.log({ maxResVidCount, highResVidCount, medResVidCount, totalVids });
// };

// ezone, music, entertainment, hot

class EZone extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(EZoneActions.getEZoneRequest());
  }

  rendereZoneLogo() {
    return (
      <div className="img-title">
        <img className="logo-ezone" src="/static/images/ezone-logo.png" />
      </div>
    );
  }

  render() {
    const { hasEZonePlaylist, eZone } = this.props;
    return (
      <div className="eZone-container" id="ezone-section">
        <div className="container">
          {this.rendereZoneLogo()}
          {hasEZonePlaylist && (
            <div className="wrap-ezone">
              <EZoneBigThumbnail thumbnailData={eZone.data[0].items[0]} />

              {eZone.data[1] && (
                <EZoneFeatureList playlist={eZone.data[1].items} />
              )}
              {eZone.data[2] && (
                <div className="slider-ezone">
                  <CustomElementPlaylistSliderItem
                    displayType="nonTitle"
                    playlistInfo={{ title: null, data: eZone.data[2].items }}
                    styleSlider="wrap-img-slider-ezone"
                    zone="hotZoneThumbnailItems"
                    autoPlay={false}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <style jsx>
          {`
            .slider-ezone {
              margin-bottom: 20px;
            }
            .eZone-container {
              padding-bottom: 10px;
              position: relative;
              background-color: white;
              background-size: cover;
              width: 100%;
            }
            .wrap-img-slider-ezone {
              height: 135px;
              width: 235px;
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const eZone = selectors.getEZone(state);
  const hasEZonePlaylist = eZone.data.length > 0;
  return {
    eZone,
    hasEZonePlaylist
  };
};

export default connect(mapStateToProps)(EZone);
