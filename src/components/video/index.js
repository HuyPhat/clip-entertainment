import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import PlayerVideo from '@components/custom-element/player/video';
import CustomElementListItemVideoGrid from '@components/custom-element/list/item-video-grid';
import CustomElementCategoryBannerTitle from '@components/custom-element/category/banner-title';

import { FormGroup } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

import { Actions } from '@popskids-core';

const {
  GooglePlusShareButton
} = ShareButtons;

import Router from 'next/router';

import slug from 'slug';
import * as _ from 'lodash';

class VideoIndex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			urlShare: '',

			nextVideo: false,
			checkFavourite: false,
			isFavourite: false,

			openShareList: false,
			anchorEl: null,

			tracked: false,
			source: 'yt',

			videoId: ''
		};
		this.handleAddFavourite = this.handleAddFavourite.bind(this);
		this.handleUnlistVideoFavourite = this.handleUnlistVideoFavourite.bind(this);
		this.handleChangeBtnFavourite = this.handleChangeBtnFavourite.bind(this);

		this.handleShareFB = this.handleShareFB.bind(this);

		//Tracking
		this.handleOnReady = this.handleOnReady.bind(this);
		this.handleOnEnd = this.handleOnEnd.bind(this);
	}

	componentWillMount(){
		this.props.dispatch(Actions.getVideoDetails(this.props.videoId));
		this.props.dispatch(Actions.getVideoDetailsHasCDN(this.props.videoId));
		this.props.dispatch(Actions.addVideoToHistory({
			videoID: this.props.videoId,
			currentPlayingTime: 0
		}));
		this.checkVideoFavourite(this.props.videoId);
		this.props.dispatch(Actions.getVideoRelated(this.props.videoId));
		this.handleOnReady();
		this.setState({
			videoId: this.props.videoId
		});
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.videoId != this.state.videoId) {
			this.props.dispatch(Actions.getVideoDetails(nextProps.videoId));
			this.props.dispatch(Actions.getVideoDetailsHasCDN(nextProps.videoId));

			this.props.dispatch(Actions.addVideoToHistory({
				videoID: nextProps.videoId,
				currentPlayingTime: 0
			}));
			this.checkVideoFavourite(nextProps.videoId);
			this.props.dispatch(Actions.getVideoRelated(nextProps.videoId));
			this.handleOnReady();

			this.setState({
				videoId: nextProps.videoId
			});
		}

		if(
			!_.isUndefined(nextProps.isLoading) 
			&& !_.isEmpty(nextProps.isLoading)
			&& this.state.checkFavourite
		) {
			if(
				(nextProps.isLoading.name === "ADD_VIDEO_TO_FAVOURITE" || nextProps.isLoading.name === "UNLIST_VIDEO_FAVOURITE")
				&& !nextProps.isLoading.loading
			){
				this.checkVideoFavourite(nextProps.videoId);
				this.setState({
					checkFavourite: false
				});
			}
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if(!_.isUndefined(nextProps.videoCDN) && !_.isEmpty(nextProps.videoCDN) && !nextState.tracked) {
			if(nextProps.videoCDN.sourceType == 'brightcove') {
				this.setState({
					tracked: true,
					source: 'brightcove'
				})
			}

			if(nextProps.videoCDN.sourceType == 'cdn') {
				this.setState({
					tracked: true,
					source: 'cdn'
				})
			}
		}
	}

	componentDidMount() {
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '1755969684659219',
				cookie     : true,
				xfbml      : true,
				version    : 'v2.3'
			});
			FB.AppEvents.logPageView();
			FB.AppEvents.logEvent("play-video-click");
		};

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		this.setState({
			urlShare: window.location.protocol + '//' + window.location.hostname + '/video-promotion/' + this.props.videoName + '-' + this.props.videoId
		});
	}

	//Tracking
	handleOnReady() {
		this.props.dispatch(Actions.videoLogsStart({
			videoID: this.props.videoId,
			source: this.state.source
		}));
	}

	handleOnEnd(val) {
		if(!_.isUndefined(this.props.videoRelated) && this.props.videoRelated.data.length > 1 && val) {
			var firstVideo = _.take(_.tail(this.props.videoRelated.data))[0];
			setTimeout(function() {
				window.location.href = window.location.protocol + '//' + window.location.hostname + '/video/' + _.kebabCase(slug(firstVideo.title)) + '-' + firstVideo.id;
			}.bind(this), 2000);
		}
	}
	//End tracking

	handleShareFB(e) {
		FB.ui(
			{
				method: 'share',
				mobile_iframe: true,
				href: this.state.urlShare
			}, function(response){
				console.log('handleShareFB: ', response);
			});
	}

	checkVideoFavourite(id) {
		this.props.dispatch(Actions.isVideoFavourite({
			videoID: id
		}));
	}

	handleAddFavourite() {
		this.props.dispatch(Actions.addVideoToFavourite({
			videoID: this.props.videoDetail.id
		}));
		this.setState({
			checkFavourite: true
		});
	}

	handleUnlistVideoFavourite() {
		this.props.dispatch(Actions.unlistVideoFavourite({
			videoID: this.props.videoDetail.id
		}));
		this.setState({
			checkFavourite: true
		});
	}

	renderVideoRelated() {
		var el = null;
		if(!_.isUndefined(this.props.videoRelated)) {
			el = (
				<Grid className="mt20 pl5 pr5" container spacing={8}>
					{
						_.tail(this.props.videoRelated.data).map((video) =>
							<Grid item xs={6} sm={3} md={3} key={ video.id } className="border-radius-default">
								<CustomElementListItemVideoGrid
									video={ video }
									classCardMedia="img-responsive border-radius-default"
								/>
							</Grid>
						)
					}
				</Grid>
			);
		}
		return el;
	}

	handleChangeBtnFavourite(e) {
		if(e.target.checked) {
			this.handleAddFavourite();
		}else{
			this.handleUnlistVideoFavourite();
		}
	}

	renderButtonFavourite() {
		var el = null;
		if(!_.isUndefined(this.props.isFavouriteResponse)){
			el = (
				<FormGroup row className="pull-left">
					<Checkbox
						checked={ this.props.isFavouriteResponse.value }
						checkedIcon={ <i className="fa fa-heart"></i> }
						icon={ <i className="fa fa-heart-o"></i> }
						onChange={ this.handleChangeBtnFavourite }
					/>
				</FormGroup>
			);
		}

		return el;
	}

	renderShareFacebook() {
		return (
			<div className="pr10">
				<i onClick={ this.handleShareFB } className="cursor-click text-color-facebook fa fa-facebook-square fa-2x"></i>
			</div>
		);
	}

	renderShareGoogle() {
		return (
			<div className="pr10">
				<GooglePlusShareButton url={ this.state.urlShare }>
					<i className="cursor-click text-color-google fa fa-google-plus-square fa-2x"></i>
				</GooglePlusShareButton>
			</div>
		);
	}

	handleRequestCloseShareList() {
		this.setState({
			openShareList: false
		})
	}

	handleClickShare(e) {
		this.setState({
			openShareList: true,
			anchorEl: e.currentTarget
		})
	}

	render(){
		var el = null;
		if(!_.isUndefined(this.props.videoDetail)){

			var video = this.props.videoDetail;
			// var linkVideo = 'https://www.youtube.com/watch?v=' + this.props.videoDetail.youtubeID;
			var isBrightCove = false, idVideoBrightCove = false, vasttag = '';

			var videoInfo = {
				'content-type': 'video',
				'content-id': this.props.videoDetail.id,
				'content-title' : this.props.videoDetail.title
			};

			if(!_.isUndefined(this.props.videoCDN) && !_.isEmpty(this.props.videoCDN)) {
				var linkVideo = this.props.videoCDN.sourceLink;
				vasttag = this.props.videoCDN.ads.vasttag;
				if(this.props.videoCDN.sourceType == 'brightcove') {
					isBrightCove = true;
					idVideoBrightCove = this.props.videoCDN.sourceResId;
				}

				videoInfo['source-res-id'] = this.props.videoCDN.sourceResId;
				videoInfo['source-video'] = this.props.videoCDN.sourceType;

				var videoJsOptions = {
					autoplay: true,
					controls: true,
					poster: (!_.isUndefined(video.thumbnails.maxres))? video.thumbnails.maxres.url : video.thumbnails.medium.url,
					plugins: {
						vastClient: {
							adTagUrl: vasttag,
							// adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator='+Date.now(),
							playAdAlways: true,
							adCancelTimeout: 5000,
							adsEnabled: true,
							verbosity: 0
						}
					},
					videoInfo
				}

				if(this.props.videoCDN.sourceType != 'yt') {
					videoJsOptions.html5 = {
						hls: {
							withCredentials: true
						}
					};

					videoJsOptions.sources = [{ 
						"src": linkVideo,
						"type": "application/x-mpegURL"
					}];

				}else{
					videoJsOptions.sources = [{ 
						"src": linkVideo,
						"type": "video/mp4",
						"youtube": { "iv_load_policy": 3, "autoplay": 1 }
					}];
				}

				el = (
					<div>
						<a href={ "https://popskidstv.onelink.me/1241775520?pid=wap&af_dp=popskidstv%3A%2F%2Fvideo%2F" + this.props.videoId + "&af_web_dp=https%3A%2F%2Fweb.popskids.tv%2Fvideo-promotion%2Fpk-" + this.props.videoId }>
							<Grid className="open-in-app-container bg-color-main text-center" container spacing={8}>
								<Grid item xs={12} sm={12} className="open-in-app-content">
									<img className="pull-left" src="/static/images/logo-app.jpg" />
									<span >Xem trong ứng dụng</span>
								</Grid>
							</Grid>
						</a>
						<div className="row" id="onVideo">

							<Card elevation = { 0 }>
								<CardContent className="pd0">
									<PlayerVideo
										videoJsOptions = { videoJsOptions }
										onEnd={ this.handleOnEnd }
										isBrightCove={ isBrightCove }
										idVideoBrightCove={ idVideoBrightCove }
										onReady={ this.handleOnReady }
										idTransaction={ 
											(!_.isUndefined(this.props.videoLogsStartResponse) && !_.isUndefined(this.props.videoLogsStartResponse.id))
											?
												this.props.videoLogsStartResponse.id
											:
												false
										}
									/>
								</CardContent>
								<CardContent>
									<Typography type="title" component="h2">
										{ video.title }
									</Typography>
								</CardContent>
								<CardActions disableActionSpacing>
									<div style={{ 'flex': '1 1 auto' }} />
									{ this.renderButtonFavourite() }
									{ this.renderShareFacebook() }
									{ this.renderShareGoogle() }
								</CardActions>
							</Card>

						</div>

						<CustomElementCategoryBannerTitle
							route='#'
							title={ 'Video liên quan' }
							colorLinear="category-banner-pink"
						/>

						{ this.renderVideoRelated() }
					</div>
				);

			}
		}
		return el;
	}


}

const mapStateToProps = (state) => {
	return {
		videoDetail: state.video,
		videoLogsStartResponse: state.videoLogsStartResponse,
		videoCDN: state.videoCDN,
		videoRelated: state.videoRelated,
		addFavouriteResponse: state.addFavouriteResponse,
		isFavouriteResponse: state.isFavouriteResponse,
		unlistFavouriteResponse: state.unlistFavouriteResponse,

		isLoading: state.isLoading
	};
};

export default connect(mapStateToProps)(VideoIndex);