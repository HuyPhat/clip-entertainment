import React from "react";
// import PropTypes from "prop-types";
import videojs from "video.js";
import "videojs-youtube/dist/Youtube.min";

export default class VideoPlayer extends React.Component {
  //   static propTypes = {
  //     videoJsOptions: PropTypes.object.isRequired
  //   };

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => (this.videoNode = node)}
            className="video-js"
            controls
            data-setup={'"techOrder": ["flash", "youtube", "html5"]'}
          />
        </div>
      </div>
    );
  }
}
