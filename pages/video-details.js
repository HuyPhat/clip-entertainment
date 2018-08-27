import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import ReactPlayer from 'react-player';
// import Router from 'next/router';
import api from '../src/api/index';
import Main from '@components/layouts/main';
import RelatedVideoItems from '@components/video-details/related-video-items';
import RelatedPlaylists from '@components/video-details/related-playlists';
import Breadcrumb from '@components/custom-element/breadcrumb';
import PlayerVideo from '@components/custom-element/player/video';

class VideoDetailsPage extends React.Component {
  static propTypes = {
    videoId: PropTypes.string
  };

  static defaultProps = {
    videoId: null
  };

  static async getInitialProps({ ctx }) {
    const videoId = ctx.query.videoId;
    return { videoId };
  }

  state = {
    currentVideo: null,
    video: null,
    error: null,
    videoId: this.props.videoId
  };

  componentDidMount() {
    this.getVideoData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoId !== this.props.videoId) {
      this.setState({ videoId: nextProps.videoId }, () => this.getVideoData());
    }
  }

  async getVideoData() {
    const { videoId } = this.state;
    try {
      const results = await Promise.all([
        api.getVideoById({ videoId }),
        api.getVideoInfo({ videoId })
      ]);
      //   const {relatedVideos} = results[1].data;
      this.setState({
        currentVideo: results[0].data,
        video: results[1].data,
        error: null
      });
    } catch (error) {
      this.setState({ error: error, currentVideo: null, video: null });
    }
  }

  formatDate(date) {
    const rawDate = new Date(date);
    let dd = rawDate.getDate();
    let mm = rawDate.getMonth() + 1;
    const yyyy = rawDate.getFullYear();
    // let hh = rawDate.getHours();
    // let minute = rawDate.getMinutes();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    // if (hh < 10) {
    //   hh = '0' + hh;
    // }
    // if (minute < 10) {
    //   minute = '0' + minute;
    // }
    // const formatDate = dd + '/' + mm + '/' + yyyy + ' - ' + hh + ':' + minute;
    const formatDate = dd + '/' + mm + '/' + yyyy;
    return formatDate;
  }

  videoJsOptions() {
    const { currentVideo, video, error } = this.state;
    const { videoId } = this.props;
    const videoThumbnails = _.get(video, 'thumbnails');
    const poster = videoThumbnails
      ? (videoThumbnails.maxres || videoThumbnails.medium).url
      : '';
    const vasttag = _.get(video.ads, 'vasttag', '');
    var videoInfo = {
      'content-type': 'video',
      'content-id': videoId,
      'content-title': video.title,
      'source-res-id': video.sourceResId,
      'source-video': video.sourceType
    };
    var videoJsOptions = {
      autoplay: true,
      controls: true,
      poster: poster,
      // plugins: {
      //   vastClient: {
      //     adTagUrl: vasttag,
      //     playAdAlways: true,
      //     adCancelTimeout: 5000,
      //     adsEnabled: true,
      //     verbosity: 0
      //   }
      // },
      videoInfo
    };
    console.log('videoJsOptions: ', videoJsOptions);
    return videoJsOptions;
  }

  handleOnEnd = val => {
    const { relatedVideos } = this.state.video;
    if (!_.isUndefined(videoRelated) && relatedVideos.data.length > 1 && val) {
      var firstVideo = _.take(_.tail(relatedVideos.data))[0];
      setTimeout(
        function() {
          window.location.href =
            window.location.protocol +
            '//' +
            window.location.hostname +
            '/video-details/?videoId=' +
            firstVideo.id;
        }.bind(this),
        2000
      );
    }
  };

  render() {
    const { currentVideo, video, error } = this.state;
    if (currentVideo !== null && video !== null) {
      const breadcrumb = [
        { type: 'category', value: video.category },
        { type: 'mainTag', value: video.mainTag }
      ];
      let videoJsOptions = this.videoJsOptions();
      const linkVideo = video.sourceLink;
      let isBrightCove = false;
      let idVideoBrightCove = false;

      if (video.sourceType == 'brightcove') {
        isBrightCove = true;
        idVideoBrightCove = video.sourceResId;
      }

      if (video.sourceType != 'yt') {
        videoJsOptions.html5 = {
          hls: {
            withCredentials: true
          }
        };
        videoJsOptions.sources = [
          {
            src: linkVideo,
            type: 'application/x-mpegURL'
          }
        ];
      } else {
        videoJsOptions.sources = [
          {
            src: linkVideo,
            type: 'video/mp4',
            youtube: { iv_load_policy: 3, autoplay: 1 }
          }
        ];
      }
      return (
        <Main>
          <div
            className="container bg-overlay-detail"
            style={{ marginTop: '195px' }}
          >
            <PlayerVideo
              videoJsOptions={videoJsOptions}
              onEnd={this.handleOnEnd}
              isBrightCove={isBrightCove}
              idVideoBrightCove={idVideoBrightCove}
            />
            <div className="video-detail">
              {_.get(video, 'relatedVideos.data', []).length > 1 && (
                <div className="related-video-items-container">
                  <RelatedVideoItems
                    playlistInfo={{
                      data: _.get(video, 'relatedVideos.data', [])
                    }}
                  />
                  <div className="less">
                    <img src="static/images/arrow-less.png" alt="" />
                  </div>
                </div>
              )}
              <h3>{_.get(currentVideo, 'title')}</h3>
              <div className="video-tool">
                <ul className="button-group">
                  <li className="view">
                    <div className="hover-effect">
                      <img src="/static/images/ezone-view-icon.png" />{' '}
                      {video.totalView} Views
                    </div>
                  </li>
                  <li className="date">
                    <div className="hover-effect">
                      {this.formatDate(video.publishedAt)}
                    </div>
                  </li>
                  <li className="header-category">
                    <div className="hover-effect">
                      <img src="/static/images/ezone-share-icon.png" />
                    </div>
                  </li>
                  <li className="header-category">
                    <div className="hover-effect">
                      <img src="/static/images/ezone-like-icon.png" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="detail-desc">
                <p>{_.get(currentVideo, 'description')}</p>
                <a href="#" className="readmore">
                  Xem thêm
                </a>
              </div>
            </div>
            <div className="related-playlists-container">
              <RelatedPlaylists
                playlists={_.get(video, 'relatedPlaylists.data', [])}
                zone="hotZoneThumbnailItems"
              />
            </div>
            <div className="container">
              <div className="mt80 mb80" />
            </div>
          </div>
        </Main>
      );
    }
    return null;
  }
}

export default VideoDetailsPage;
