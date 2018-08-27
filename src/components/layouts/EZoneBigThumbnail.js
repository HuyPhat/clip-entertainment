import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GroupButton from '@components/custom-element/cards/group-button';
let stringHelper = require('../../text-helper/index');

class EZoneBigThumbnail extends Component {
	static propTypes = {
		thumbnailData: PropTypes.object
	};

	renderImgLink(imgSrc) {
		return (
			<Grid item md={1} className="hover-effect">
				<img src={imgSrc} />
			</Grid>
		);
	}
	render() {
		const { thumbnailData } = this.props;
		return (
			<div className="eZone-big-container">
				<div className="eZone-container-bigThumbnail">
					<img
						className="eZone-bigThumbnail"
						src={thumbnailData.bannerURL || thumbnailData.featureURL}
					/>
				</div>
				<div className="eZone-bigThumbnail-des">
					<div className="eZone-bigThumbnail-des-frame">
						<fieldset className="noText">
							<legend>
								<h1 className="f400 lh-1c1">
									{stringHelper.truncate(thumbnailData.title, 70)}
								</h1>
							</legend>
							<div className="video-title eZone-bigThumbnail-title">
								{stringHelper.truncate(thumbnailData.sortDesc, 130)}
							</div>
							<GroupButton
								displayType="orange"
								justify="center"
								titleStyle="span-button-play"
								style1={'button-group'}
								videoItem={thumbnailData}
							/>
							<div className="lineText">
								<img src="/static/images/fieldset-line.png" alt="Rectangle" />
							</div>
						</fieldset>
					</div>
				</div>
				<div className="content-mobile">
					<h1 className="video-title eZone-bigThumbnail-title">
						<a>{thumbnailData.sortDesc}</a>
					</h1>
					<span className="video-title eZone-bigThumbnail-subtitle" />
				</div>


				<style jsx>{`
          h1 {
            color: #fff;
	}

	 .eZone-big-container {
            position: relative;
            overflow: hidden;
          }
          .eZone-container-bigThumbnail {
            height: 545px;
          }
        .eZone-container-bigThumbnail img {          
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		object-fit: cover;
		object-position: 50% 50%;
		transform: translate(-50%,-50%);
        }
	  .eZone-container-bigThumbnail:before {
		content: '';
		padding-top: 56%;
		height: 99.5%;
		width: 100%;
		z-index: 2;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.3);
		top: 0;
	
	  }
        eZone-big-container a {
          color: #000;
        }
				.eZone-bigThumbnail-title  {
					font-weight: 300;
					font-size: 14px;
					line-height: 1.5;
          max-height: 70px;
          color: #c7c7c7;
	    display: block;
	    padding: 0 22%;
	    margin-top: 5px;
				}
				.eZone-bigThumbnail-subtitle {
					text-align: center;
					padding-left: 20%;
					padding-right: 20%;
				font-weight: 300;
					font-size: 13px;
					line-height: 19px;
					max-height: 38px;
        }
        .content-mobile {
          display: none;
        }
        @media only screen and (max-width: 768px) {
          .video-image-thumbnail-wrapper .,
          .item-thumbnail {
            // width: 100% !important;
                height: 172px;

          }
          .mt-20 {
            margin-top: 20px;
          }
          .span-button-play {
            font-size: 18px;
            font-weight: 400;
          }

	    .eZone-container-bigThumbnail:before {
		    height: auto;
	    }

	    .eZone-bigThumbnail-title  {
		    color: #000;
			line-height: 20px;
			max-height: 900px;
			padding: 0;
	    }
         
	}
         
          
        `}</style>
			</div>
		);
	}
}

export default EZoneBigThumbnail;
