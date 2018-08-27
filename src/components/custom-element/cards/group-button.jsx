import React from 'react';
import PropTypes from 'prop-types';
import LinkVideoDetails from '@components/custom-element/link/video-details/index';
import ButtonFacebookShare from '@components/custom-element/button/facebook-share/index';
import ButtonFacebookLike from '@components/custom-element/button/facebook-like/index';

class GroupButton extends React.PureComponent {
  render() {
    const { titleStyle, style1, style2, videoItem, zone } = this.props;
    const { videoID, title } = videoItem;
    const urlShare = `${window.location.protocol}'//'${
      window.location.hostname
    }'/video-promotion/'${title}'-'${videoID}`;

    if (this.props.displayType == 'orange') {
      return (
        <ul className={style1}>
          <li className={'btn-play'}>
            <LinkVideoDetails
              href="/video-details"
              text="Play"
              video={videoItem}
            >
              <i className="fa fa-caret-right" aria-hidden="true" />
            </LinkVideoDetails>
            {/* <LinkVideoDetails
              href="/video-detaills"
              text="Play"
              video={videoItem}
            >
              <i className="fa fa-caret-right" aria-hidden="true" />
            </LinkVideoDetails> */}
          </li>
          <li className="header-category">
            <ButtonFacebookShare href={urlShare} />
          </li>
          <li className="header-category">
            <ButtonFacebookLike />
          </li>
          <style jsx>
            {`
              .btn-play {
                cursor: pointer;
                position: relative;
              }
              .btn-play::after {
                content: '';
                width: 100%;
                height: 100%;
                background-color: #000;
                opacity: 0.1;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
              }
            `}
          </style>
        </ul>
      );
    } else {
      const classButtonSlide =
        this.props.zone === 'hotZoneThumbnailItems' ? 'button-group-slide' : '';
      return (
        <ul className={style1 + ' ' + classButtonSlide}>
          <li className="btn-play" style={{ borderColor: '#fff' }}>
            <LinkVideoDetails href="/video-details" video={videoItem}>
              <i className="fa fa-caret-right icon-play" aria-hidden="true" />
            </LinkVideoDetails>
            {/* <LinkVideoDetails href="/video-detaills" video={videoItem}>
              <i className="fa fa-caret-right icon-play" aria-hidden="true" />
            </LinkVideoDetails> */}
          </li>
          <li className="header-category">
            <ButtonFacebookShare />
          </li>
          <li className="header-category">
            <ButtonFacebookLike />
          </li>
          <style jsx>{`
            white.btn-play {
              border-color: #fff;
            }
            i.icon-play {
              color: #fff;
              margin-left: 4px;
              margin-right: 3px;
            }
          `}</style>
        </ul>
      );
    }
  }
}

GroupButton.propTypes = {
  displayType: PropTypes.oneOf(['white', 'orange']),
  zone: PropTypes.oneOf(['ezoneFeature', 'hotZoneThumbnailItems', ''])
};

GroupButton.defaultProps = {
  zone: '',
  displayType: PropTypes.oneOf(['white', 'orange']),
  videoItem: PropTypes.object
};

export default GroupButton;
