import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
// import GroupButton from '@components/custom-element/cards/group-button';
import images from '../../../images';
let stringHelper = require('../../../text-helper/index');
// import Router from 'next/router';
// const mockedRouter = { push: () => {} };
// Router.router = mockedRouter;

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

  removeShortDesc = () => this.setState({ showShortDesc: false });

  addShortDesc = () => this.setState({ showShortDesc: true });

  render() {
    const { showShortDesc } = this.state;
    const { videoItem, titleStyle } = this.props;
    const item = videoItem;
    const thumbnailUrl = item.thumbnails
      ? (
          item.thumbnails['medium'] ||
          item.thumbnails['high'] ||
          item.thumbnails['maxres']
        ).url
      : item.thumbnail
        ? item.thumbnail
        : item.defaultURL || item.bannerURL || item.featureURL;

    return (
      <div
        key={item.id}
        onClick={() => {
          Router.push({
            pathname: '/video-details',
            query: { videoId: item.id }
          });
        }}
        className="item-inside-container"
        onMouseOut={this.removeShortDesc}
        onMouseOver={this.addShortDesc}
      >
        <div className="video-image-thumbnail-wrapper">
          <VideoImageThumbnail
            className={'item-thumbnail '}
            src={thumbnailUrl}
            defaultThumbnailUrl={images.defaultImagePlaceholder}
          />
        </div>
        <div className="item-title-container-outside">
          <div className="item-title-outside">
            <Typography className={'eZone-feature-item-title ' + titleStyle}>
              <div className={'video-title'}>
                {stringHelper.truncate(item.title, 60)}
              </div>
            </Typography>
          </div>
        </div>

        {/* <GroupButton
          displayType="orange"
          titleStyle={'btn-play-small'}
          style1={'button-group'}
          style2={'btn-play-small'}
          videoItem={item}
          zone={this.props.zone}
        /> */}
        <style less>
          {`
              .slick-slide {
                padding: 0 2px;
              }
              .hotZone-container .slider-hotzone {
                bottom: 50px;
              }
              .item-inside-container {
                
                transition: all .3s ease;
                cursor: pointer;
                
              }
            
             
              .item-inside-container .video-image-thumbnail-wrapper .item-thumbnail{
                height: 135px;
                background-size: cover;
                background-position: center;
              }
              .black {
                color: #000;
              }
              .white {
                color: #fff
              }
              `}
        </style>
      </div>
    );
  }
}

VideoItem.propTypes = {
  videoItem: PropTypes.object,
  displayType: PropTypes.oneOf([
    'titleInBottom',
    'titleInMiddle',
    'btnInMiddle'
  ])
};

export default VideoItem;
