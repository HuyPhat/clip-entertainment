import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import { Actions, TrackingBrightcove } from '@popskids-core';

// import { trackingWithBrightcove } from '@components/tracking/brightcove';
import $ from "jquery";
import * as _ from "lodash";
import videojs from "video.js";
import "videojs-youtube/dist/Youtube.min";

class PlayerVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSetup: `{
				"techOrder": ["flash", "youtube", "html5"]
			}`,

      configs: {},
      currentTime: 0,
      ended: false,

      adTagUrl: "",
      videoUrl: "",

      //Tracking by facebook
      playedOneSecond: false,
      playedTenSecond: false,
      playedThirtySecond: false,
      playedTenPercent: false,
      playedTwentyFivePercent: false,
      playedFiftyPercent: false,
      playedSeventyFivePercent: false,
      playedHundredPercent: false,

      //Tracking by BrightCove
      secondsDefaultTrackingB: 10,
      secondsSendTrackingB: 10,
      range: 0,

      //Tracking by Api Pops
      playedTenSecondP: false,
      playedThirtySecondP: false,
      playedTenPercentP: false,
      playedTwentyFivePercentP: false,
      playedFiftyPercentP: false,
      playedSeventyFivePercentP: false,
      playedHundredPercentP: false
    };
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    console.log(window);
    this.player = window.videojs(this.videoRef.current);
    // this.player = videojs(
    //   this.videoRef.current,
    //   {
    //     autoplay: true,
    //     controls: true,
    //     sources: [
    //       {
    //         type: "video/mp4",
    //         src: "https://www.youtube.com/watch?v=kAPDmEgezdo"
    //       }
    //     ]
    //   },
    //   function onPlayerReady() {
    //     console.log("onPlayerReady", this);
    //   }
    // );
    this.getCurrentTime();
    if (this.props.videoJsOptions.videoInfo["source-video"] == "yt") {
      $(".vjs-big-play-button").fadeOut();
      $(".vjs-loading-spinner").fadeOut();
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId: "1755969684659219",
        cookie: true,
        xfbml: true,
        version: "v2.3"
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.player.ready(() => {
      this.setState({
        videoUrl: nextProps.videoJsOptions.sources[0].src
      });

      if (!_.isUndefined(nextProps.videoJsOptions.poster)) {
        this.player.poster(nextProps.videoJsOptions.poster);
      }

      this.setState({
        ended: !this.state.ended
      });

      if (!_.isUndefined(nextProps.videoJsOptions.plugins)) {
        if (
          !_.isUndefined(nextProps.videoJsOptions.plugins.vastClient) &&
          nextProps.videoJsOptions.plugins.vastClient.adTagUrl !=
            this.state.adTagUrl &&
          !_.isUndefined(this.player)
        ) {
          var optsVast = nextProps.videoJsOptions.plugins.vastClient;
          this.player.vastClient(optsVast);

          this.setState({
            adTagUrl: nextProps.videoJsOptions.plugins.vastClient.adTagUrl
          });
          //
          var src = nextProps.videoJsOptions.sources[0];

          var player = this.player;
          this.player.on("error", function(err) {
            if (
              err.target.innerText ==
              "This is a modal window.The media could not be loaded, either because the server or network failed or because the format is not supported."
            ) {
              if (!_.isUndefined(nextProps.videoJsOptions.sources[0].youtube)) {
                var src = nextProps.videoJsOptions.sources[0];
                src["type"] = "video/youtube";
                player.src(src);
              }

              if (nextProps.videoJsOptions.autoplay) {
                player.play();
              }
            }

            if (err.target.player.currentType_ != "video/youtube") {
              if (!_.isUndefined(nextProps.videoJsOptions.sources[0].youtube)) {
                var src = nextProps.videoJsOptions.sources[0];
                src["type"] = "video/youtube";
                player.src(src);
              }

              if (nextProps.videoJsOptions.autoplay) {
                player.play();
              }
            }
          });

          // this.player.on('firstplay', function(info){
          // 	if(nextProps.videoJsOptions.autoplay) {
          // 		player.play();
          // 	}
          // });

          this.playVideo();
          this.player.src(src);
          this.setVolume(0.8);
          this.setMuted(false);
          if (nextProps.videoJsOptions.autoplay) {
            player.play();
          }
          //
        }
      }

      var player = this.player;

      this.player.on("ended", info => {
        if (player.currentSrc() == this.state.videoUrl) {
          this.setState({
            ended: true
          });
          this.props.onEnd(true);
        }
      });

      // this.player.on("vast.adStart", function () {
      // 	console.log('vast.adStart');
      // });

      // this.player.on("vast.firstPlay", function () {
      // 	player.play();
      // });

      this.player.on("vast.contentEnd", function() {
        var src = nextProps.videoJsOptions.sources[0];
        if (!_.isUndefined(nextProps.videoJsOptions.sources[0].youtube)) {
          src["type"] = "video/youtube";
          player.src(src);
        } else {
          player.src(src);
        }

        if (nextProps.videoJsOptions.autoplay) {
          player.play();
        }
      });

      // this.player.on("vast.adError", function () {
      // 	console.log('adError');
      // });

      // this.player.on("vast.adsCancel", function () {
      // 	console.log('adsCancel');
      // });
    });
  }

  componentWillUnmount() {
    this.unmountVideoPlayer();
    clearInterval(this.state.intervalCurrentTime);
  }

  unmountVideoPlayer() {
    if (this.player) {
      this.player.dispose();
    }
  }

  mountVideoPlayer() {
    this.player = videojs(this.videoNode, this.props.videoJsOptions);
  }

  //Player get Info
  getDuration() {
    return this.player.duration();
  }

  getCurrentTime() {
    var videoInfo = this.props.videoJsOptions.videoInfo;
    let paramsFirst = {
      "content-type": videoInfo["content-type"],
      "content-id": videoInfo["content-id"],
      "source-res-id": videoInfo["source-res-id"],
      "source-video": videoInfo["source-video"]
      // 'ref': videoInfo['ref']
    };

    let paramsSecond = {
      "video-id": videoInfo["content-id"],
      "video-tittle": videoInfo["content-title"],
      "source-res-id": videoInfo["source-res-id"]
    };

    var intervalCurrentTime = setInterval(() => {
      this.setState({
        currentTime: this.player.currentTime()
      });

      if (this.player.currentTime() > 1 && !this.state.playedOneSecond) {
        this.setState({
          playedOneSecond: true
        });
        FB.AppEvents.logEvent("Content View Wap", null, paramsFirst);

        // if(this.props.idTransaction) {
        // 	this.props.dispatch(Actions.videoLogsUpdateView({
        // 		transactionID: this.props.idTransaction,
        // 		nSec: 1
        // 	}));
        // }
      }

      if (this.player.currentTime() > 10 && !this.state.playedTenSecond) {
        this.setState({
          playedTenSecond: true
        });
        FB.AppEvents.logEvent("video-watched-ten-second", null, paramsSecond);

        // if (this.props.idTransaction) {
        //   this.props.dispatch(
        //     Actions.videoLogsUpdateView({
        //       transactionID: this.props.idTransaction,
        //       nSec: 10
        //     })
        //   );
        // }
      }

      if (this.player.currentTime() > 30 && !this.state.playedThirtySecond) {
        this.setState({
          playedThirtySecond: true
        });
        FB.AppEvents.logEvent(
          "video-watched-thirty-second",
          null,
          paramsSecond
        );

        // if (this.props.idTransaction) {
        //   this.props.dispatch(
        //     Actions.videoLogsUpdateView({
        //       transactionID: this.props.idTransaction,
        //       nSec: 30
        //     })
        //   );
        // }
      }

      if (
        this.player.currentTime() / this.getDuration() > 0.1 &&
        !this.state.playedTenPercent
      ) {
        this.setState({
          playedTenPercent: true
        });
        FB.AppEvents.logEvent("video-watched-ten-percent", null, paramsSecond);

        // if (this.props.idTransaction) {
        //   this.props.dispatch(
        //     Actions.videoLogsUpdateView({
        //       transactionID: this.props.idTransaction,
        //       percent: 0.1,
        //       nSec: this.player.currentTime()
        //     })
        //   );
        // }
      }

      if (
        this.player.currentTime() / this.getDuration() > 0.25 &&
        !this.state.playedTwentyFivePercent
      ) {
        this.setState({
          playedTwentyFivePercent: true
        });
        FB.AppEvents.logEvent(
          "video-watched-twenty-five-percent",
          null,
          paramsSecond
        );

        // if (this.props.idTransaction) {
        //   this.props.dispatch(
        //     Actions.videoLogsUpdateView({
        //       transactionID: this.props.idTransaction,
        //       percent: 0.25,
        //       nSec: this.player.currentTime()
        //     })
        //   );
        // }
      }

      if (
        this.player.currentTime() / this.getDuration() > 0.5 &&
        !this.state.playedFiftyPercent
      ) {
        this.setState({
          playedFiftyPercent: true
        });
        FB.AppEvents.logEvent(
          "video-watched-fifty-percent",
          null,
          paramsSecond
        );

        // if (this.props.idTransaction) {
        //   this.props.dispatch(
        //     Actions.videoLogsUpdateView({
        //       transactionID: this.props.idTransaction,
        //       percent: 0.5,
        //       nSec: this.player.currentTime()
        //     })
        //   );
        // }
      }

      if (
        this.player.currentTime() / this.getDuration() > 0.75 &&
        !this.state.playedSeventyFivePercent
      ) {
        this.setState({
          playedSeventyFivePercent: true
        });
        FB.AppEvents.logEvent(
          "video-watched-seventy-five-percent",
          null,
          paramsSecond
        );

        // if (this.props.idTransaction) {
        //   this.props.dispatch(
        //     Actions.videoLogsUpdateView({
        //       transactionID: this.props.idTransaction,
        //       percent: 75,
        //       nSec: this.player.currentTime()
        //     })
        //   );
        // }
      }

      if (
        this.player.currentTime() &&
        this.props.isBrightCove &&
        !this.state.ended
      ) {
        if (this.player.currentTime() > this.state.secondsSendTrackingB) {
          // TrackingBrightcove.trackingWithBrightcove('video_engagement', this.props.videoJsOptions.sources[0].src, this.getDuration());
          this.setState({
            secondsSendTrackingB:
              this.player.currentTime() + this.state.secondsDefaultTrackingB
          });
        }
      }
    }, 1000);

    this.setState({
      intervalCurrentTime
    });
  }
  //End player get Info

  //Player trigger
  setVideoPlayerSrc(src) {
    this.player.src(src);
  }

  restartVideo() {
    this.player.currentTime(0).play();
  }

  setMuted(val) {
    this.player.muted(val);
  }

  setVolume(val) {
    this.player.volume(val);
  }

  playVideo() {
    this.player.play();
  }

  pauseVideo() {
    this.player.pause();
  }

  togglePauseVideo() {
    if (this.player.paused()) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }
  //End player trigger

  render() {
    return (
      <div data-vjs-player>
        {/* <video
          ref="player"
          className="video-js"
          controls
          data-setup={'"techOrder": ["flash", "youtube", "html5"]'}
    /> */}
        <video
          ref={this.videoRef}
          className="video-js"
          controls
          data-setup={'"techOrder": ["flash", "youtube", "html5"]'}
        />
      </div>
    );
  }
}

PlayerVideo.defaultProps = {
  isBrightCove: false,
  idVideoBrightCove: false,
  idTransaction: false,
  onReady: () => {},
  onEnd: () => {}
};

PlayerVideo.propTypes = {
  ads: PropTypes.array,
  onReady: PropTypes.func
};

export default connect()(PlayerVideo);
