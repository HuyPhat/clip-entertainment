import React from 'react';
import PropTypes from 'prop-types';
import images from '../../../images';

/* Video Image Thumbnail */
export default class VideoImageThumbnail extends React.Component {
  static propTypes = {
    src: PropTypes.string,
    placeholder: PropTypes.string,
    customStyle: PropTypes.object,
    fixedHeight: PropTypes.number,
    fixedWidth: PropTypes.number
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
      fixedHeight,
      fixedWidth,
      ...props
    } = this.props;
    const source = !this.state.loaded || this.state.error ? placeholder : src;
    const backgroundImgHeight = fixedHeight ? fixedHeight : 130;
    const backgroundImgWidth = fixedWidth ? fixedWidth : 306;
    return (
      <div className="video-image-thumbnail-wrapper">
        <div
          className="video-thumbnail"
          style={{
            backgroundImage: `url(${source})`,
            height: `${backgroundImgHeight}px`,
            width: `${backgroundImgWidth}px`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
}
