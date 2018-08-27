import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import GroupButton from '@components/custom-element/cards/group-button';
import images from '../../../images';
let stringHelper = require('../../../text-helper/index');

import Router from 'next/router';
const mockedRouter = { push: () => {} };
Router.router = mockedRouter;

/* Video Image Thumbnail */
class VideoImageThumbnail extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    placeholder: PropTypes.string,
    defaultThumbnailUrl: PropTypes.string
  };

  static defaultProps = {
    placeholder: images.defaultImagePlaceholder
  };

  state = {
    loaded: false,
    error: false
  };

  componentDidMount() {
    // Making this a global so it can be later
    // nullified when the component unmounts
    this.image = new Image();

    this.image.src = this.props.src;
    this.image.onload = this.handleLoad;
    this.image.onerror = this.handleError;
  }

  shouldComponentUpdate(nextState, nextProps) {
    return !this.state.loaded;
  }

  componentWillUnmount() {
    this.image.onerror = null;
    this.image.onload = null;
    this.image = null;
  }

  handleLoad = e => {
    this.setState({
      loaded: true
    });
  };

  handleError = e => {
    console.error('Failed to load ', this.props.src);

    this.setState({
      error: true
    });
  };

  render() {
    const {
      src,
      placeholder,
      children,
      defaultThumbnailUrl,
      ...props
    } = this.props;
    // const source = !this.state.loaded || this.state.error ? placeholder : src;
    const source =
      !this.state.loaded || this.state.error ? defaultThumbnailUrl : src;
    return (
      <div className="video-image-thumbnail-wrapper">
        <div
          className="video-thumbnail"
          style={{ backgroundImage: `url(${source})` }}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
}

/* Video Item */
class VideoItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.openVideoDetail = this.openVideoDetail.bind(this);
    this.state = {
      showShortDesc: false
    };
  }

  openVideoDetail() {
    console.log('Click to item: ', this.props.item.title);
  }

  updateCurrentSlideIndex = () => {
    this.props.updateCurrentSlideIndex(this.props.videoIndex);
  };

  removeShortDesc = () => this.setState({ showShortDesc: false });

  addShortDesc = () => this.setState({ showShortDesc: true });

  render() {
    const {
      videoItem,
      size,
      sizeImg,
      titleStyle,
      titleStyle1,
      titleStyle2,
      displayZone
    } = this.props;
    // console.log(videoItem);
    const item = videoItem;
    const { showShortDesc } = this.state;
    const thumbnailUrl = item.thumbnails
      ? (
          item.thumbnails['medium'] ||
          item.thumbnails['high'] ||
          item.thumbnails['maxres']
        ).url
      : item.thumbnail
        ? item.thumbnail
        : item.defaultURL || item.bannerURL || item.featureURL;
    if (this.props.displayType == 'titleInMiddle') {
      return (
        <div
          key={item.title}
          className={
            'item-inside-container ' + this.props.className + ' ' + titleStyle2
          }
          onClick={this.updateCurrentSlideIndex}
          onMouseOut={this.removeShortDesc}
          onMouseOver={this.addShortDesc}
        >
          <VideoImageThumbnail
            className={'item-thumbnail item-corner ' + sizeImg}
            src={thumbnailUrl}
            defaultThumbnailUrl={images.defaultImagePlaceholder}
          />
          <GroupButton
            className="group-button-thumbnail"
            displayType="white"
            videoItem={item}
            zone={this.props.zone}
          />
          <div className="item-title-container">
            <h3 className="item-title-inside">
              <a className="video-title">
                {stringHelper.truncate(item.title, 60)}
              </a>
            </h3>
          </div>
          {displayZone === 'hot' && showShortDesc && <p>{item.sortDesc}</p>}
        </div>
      );
    } else if (this.props.displayType == 'btnInMiddle') {
      return (
        <div
          key={item.title}
          onClick={this.updateCurrentSlideIndex}
          onMouseOut={this.removeShortDesc}
          onMouseOver={this.addShortDesc}
        >
          <VideoImageThumbnail
            className={'item-thumbnail ' + sizeImg}
            src={thumbnailUrl}
            defaultThumbnailUrl={images.defaultImagePlaceholder}
          />
          <div className="" />
          <GroupButton
            className="group-button-thumbnail"
            displayType="white"
            videoItem={item}
            zone={this.props.zone}
          />
          <Typography className={'eZone-feature-item-title ' + titleStyle}>
            <a>{stringHelper.truncate(item.title, 85)}</a>
            {displayZone === 'hot' && showShortDesc && <p>{item.sortDesc}</p>}
          </Typography>
        </div>
      );
    } else {
      return (
        <div
          key={item.title}
          onClick={this.updateCurrentSlideIndex}
          className="item"
          onMouseOut={this.removeShortDesc}
          onMouseOver={this.addShortDesc}
        >
          <div>
            <VideoImageThumbnail
              className={'item-thumbnail ' + sizeImg}
              src={thumbnailUrl}
              defaultThumbnailUrl={images.defaultImagePlaceholder}
            />
          </div>

          <Typography className={'eZone-feature-item-title ' + titleStyle}>
            <span className={'video-title'}>
              {stringHelper.truncate(item.title, 85)}
            </span>
            {displayZone === 'hot' && showShortDesc && <p>{item.sortDesc}</p>}
          </Typography>
          <GroupButton
            displayType="orange"
            titleStyle={'btn-play-small'}
            style1={'button-group'}
            style2={'btn-play-small'}
            videoItem={item}
            zone={this.props.zone}
          />
          <style less={'true'}>
            {`
              .slick-slide {
                padding: 0 2px;
              }

              .black {
                color: #000;
              }
              .white {
                color: #fff;
              }
            `}
          </style>
        </div>
      );
    }
  }
}

VideoItem.propTypes = {
  videoItem: PropTypes.object,
  displayType: PropTypes.oneOf([
    'titleInBottom',
    'titleInMiddle',
    'btnInMiddle'
  ]),
  displayZone: PropTypes.oneOf(['hot', 'ezone', 'music', 'entertainment'])
};

VideoItem.defaultProps = {
  size: 12,
  titleStyle: 'item-title',
  displayType: 'titleInBottom'
};

export default VideoItem;
