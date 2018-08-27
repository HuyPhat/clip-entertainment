import React from 'react';
import withFacebookInit from '../common/index';

class ButtonFacebookShare extends React.PureComponent {
  // todo use href to trigger action
  // format url for sharing
  // https://web.popskids.tv/video-promotion/tong-hop-hanh-trinh-thu-phuc-pokemon-cua-satoshi-hoat-hinh-pokemon-black-and-white-phan-21-5b63f4d38d4d3f982bbc393b
  // https://web.popskids.tv/video-promotion/ + videoTitle + videoid
  render() {
    return (
      <div className="hover-effect">
        <img src={'/static/images/ezone-share-icon.png'} />
      </div>
    );
  }
}

export default withFacebookInit(ButtonFacebookShare);
