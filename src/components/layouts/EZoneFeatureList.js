import React from 'react';
import EzoneHotVideoItem from '@components/custom-element/cards/ezone-hot-video-item';

class EZoneFeatureList extends React.PureComponent {
  render() {
    return (
      <div className="eZone-feature-list">
        <div className="row">
          {this.props.playlist.map(item => (
            <EzoneHotVideoItem
              key={item.id}
              displayType={'titleInBottom'}
              item={item}
              titleStyle="item-black-title"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default EZoneFeatureList;
