import React from 'react';
import Carousel from './carousel/index';
import { Grid } from '@material-ui/core';
import PagingDots from './paging-dot';
import GroupButton from '@components/custom-element/cards/group-button';
let stringHelper = require('../../text-helper/index');

export default ({ playlist, currentSlideIndex }) => {
  const decorators = {
    renderBottomCenterControls: props => <PagingDots {...props} />,
    renderCenterLeftControls: () => null,
    renderCenterRightControls: () => null
  };

  return (
    <Grid item xs={12}>
      <Carousel slideIndex={currentSlideIndex} {...decorators}>
        {playlist.map((videoItem, index) => {
          return (
            <div key={videoItem.videoID || index} className="carousel-content">
              <div
                className="wrap-bg-img"
                style={{
                  backgroundImage: `url(${videoItem.bannerURL ||
                    videoItem.featureURL})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />

              <div className="container">
                <div className="content-slider-hotzone">
                  <h3 className="video-title">
                    {stringHelper.truncate(videoItem.title, 90)}
                  </h3>
                  <p className="video-title">
                    {stringHelper.truncate(videoItem.sortDesc, 120)}
                  </p>
                  <GroupButton
                    displayType="orange"
                    style1={'button-group'}
                    videoItem={videoItem}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
      <style less={'true'}>{`
        .hotZone-container {
          position: relative;
        }

        .big-carousel .slider-list {
          height: 800px !important;
        }
        .img-bg-hotzone {
          width: 100%;
          height: 100%;
        }
        .slide ul li button {
          font-size: 50px;
        }

        .content-slider-hotzone {
          bottom: 238px;
          position: absolute;
          max-width: 500px;
          color: #fff;
        }
        .content-slider-hotzone .button-group li {
          margin-top: 0;
        }
        #music-section
          .music-right-widget
          .button-group
          .header-category
          .hover-effect
          img,
        #entertainment-section
          .music-right-widget
          .button-group
          .header-category
          .hover-effect
          img {
          width: 27px;
          margin-bottom: 0;
        }
        #music-section .music-right-widget .button-group .btn-play,
        #entertainment-section .music-right-widget .button-group .btn-play {
          padding: 3px 15px 6px;
        }
        #entertainment-section .music-right-widget .button-group .btn-play a i,
        #music-section .music-right-widget .button-group .btn-play a i {
          font-size: 17px;
          bottom: -1px;
        }
        #entertainment-section .music-right-widget .button-group .btn-play a,
        #music-section .music-right-widget .button-group .btn-play a {
          font-size: 12px;
          padding-left: 14px;
        }
        #entertainment-section .button-group .btn-play,
        #music-section .button-group .btn-play {
          padding: 5px 20px 8px;
        }
        .button-group li {
          vertical-align: middle !important;
          margin-right: 10px;
        }
        .button-group .btn-play div {
          line-height: 1;
        }
        .button-group .btn-play a {
          font-size: 14px;
          vertical-align: middle;
          position: relative;
          color: #e05623 !important;
          padding-left: 17px;
        }
        .button-group .btn-play:hover a {
          color: #fff !important;
        }
        .button-group .btn-play a i {
          font-size: 20px;
          padding-top: 2px;
          margin-right: 10px;
          position: absolute;
          bottom: -2px;
          left: 0;
        }
        .content-slider-hotzone p {
          font-size: 14px;
          line-height: 19px;
          font-weight: 300;
          margin: 0 0 20px;
          font-style: normal;
          color: #c7c7c7;
        }
        .content-slider-hotzone h3 {
          font-weight: 400;
          font-size: 24px;
          margin: 0 0 15px;
          color: #fff;
          font-style: normal;
          line-height: 1.2;
        }
        @media only screen and (min-width: 769px) {
          .content-slider-hotzone {
            bottom: 40%;
            transform: translateY(50%);
          }
          .slider-control-bottomcenter {
            bottom: 29% !important;
          }
        }
        @media only screen and (max-width: 768px) {
          .wrap-bg-img {
            width: 100%;

            opacity: 1;
          }
          .img-bg-hotzone {
            height: 100%;
          }
          .content-slider-hotzone {
            bottom: 15rem;
          }
          .content-slider-hotzone h3 {
            font-size: 18px;
            margin-bottom: 0px;
            -webkit-line-clamp: 2;
          }
          .content-slider-hotzone p {
            -webkit-line-clamp: 2;
            margin: 10px 0 20px;
          }
        }
      `}</style>
    </Grid>
  );
};
