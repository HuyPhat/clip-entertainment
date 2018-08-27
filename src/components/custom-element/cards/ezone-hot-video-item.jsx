import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import GroupButton from '@components/custom-element/cards/group-button';
import VideoImageThumbnail from '@components/custom-element/cards/VideoImageThumbnail';
// import ZoneContext from '@components/context/zone/index';
let stringHelper = require('../../../text-helper/index');


function EzoneHotVideoItem({ item, titleStyle, size }) {
	const thumbnailUrl = (
		item.thumbnails['medium'] ||
		item.thumbnails['high'] ||
		item.thumbnails['maxres']
	).url;

	return (
		<div className="col-md-4 mb20 cuslist" key={item.title} onClick={() => { }}>
			<div className="img-thumbnail">
				<div className="img-wrapper">
					<VideoImageThumbnail
						fixedHeight={172}
						fixedWidth={306}
						src={thumbnailUrl}

					/>
					<div className="btn-group-hover">
						<GroupButton
							className="group-button-thumbnail"
							displayType="white"
							style1="btn-group"
							style2={'btn-play-small'}
							videoItem={item}
							zone="ezoneFeature"
						/>
					</div>
				</div>
				{/* <div className="btn-group-hover">
					<GroupButton
						className="group-button-thumbnail"
						displayType="white"
						style1="btn-group"
						style2={'btn-play-small'}
						videoItem={item}
						zone="ezoneFeature"
					/>
				</div> */}

			</div>
			{/* <div className="video-eZone-thumbnail"> */}

			<Typography className={'eZone-feature-item-title'}>
				<a className={titleStyle}>{stringHelper.truncate(item.title, 130)}</a>
			</Typography>

			{/* </div> */}

			<div className="img-thumbnail thumbnail-sp">
				<div className="img-wrapper">
					<VideoImageThumbnail
						fixedHeight={172}
						fixedWidth={306}
						src={thumbnailUrl}

					/>

				</div>
				<div className="video-eZone-thumbnail">

					<Typography className={'eZone-feature-item-title'}>
						<a className={titleStyle}>{stringHelper.truncate(item.title, 130)}</a>
					</Typography>

					<div className="btn-group-hover">
						<GroupButton
							className="group-button-thumbnail"
							displayType="white"
							style1="btn-group"
							style2={'btn-play-small'}
							videoItem={item}
							zone="ezoneFeature"
						/>
					</div>
				</div>
			</div>

		</div>
	);
}

EzoneHotVideoItem.propTypes = {
	item: PropTypes.object.isRequired,
	displayType: PropTypes.oneOf([
		'titleInBottom',
		'titleInMiddle',
		'btnInMiddle'
	])
};

EzoneHotVideoItem.defaultProps = {
	size: 12,
	titleStyle: 'item-title',
	displayType: 'titleInBottom'
};

export default EzoneHotVideoItem;
