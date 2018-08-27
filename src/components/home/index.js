import React from 'react';
import $ from 'jquery';
import Main from '@components/layouts/main';
import Advertisement from '@components/custom-element/advertisement/advertisement';

import HotZone from '@components/home/hot-zone';
import EZone from '@components/home/e-zone';
import MusicZone from '@components/home/music-zone';
import EntertainmentZone from '@components/home/entertainment-zone';

import '@root/style.less';

class HomeIndex extends React.PureComponent {
  renderImgLink(imgSrc) {
    return (
      <Grid item md={1} className="hover-effect">
        <img src={imgSrc} />
      </Grid>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      $('.loading-page').fadeOut();
    }, 2500);
  }

  render() {
    return (
      <Main>
        <HotZone />
        <EZone />
        <MusicZone />

        <div className="container">
          <Advertisement titleStyle="mt50" />
        </div>
        <EntertainmentZone />

        <div className="container">
          <Advertisement titleStyle="mt50" />
        </div>
        <div className="container">
          <div className="mt80 mb80" />
        </div>
        <div className="loading-page">
          <div className="loading-table">
            <div className="loading-table-cell">
              <div className="loading-wrap">
                <div className="loading-logo">
                  <img
                    className="loading-img img"
                    src="/static/images/header-popstv-logo.png"
                  />
                </div>
                <div className="loading-loader">
                  <div className="loader">
                    <div className="bar bar1" />
                    <div className="bar bar2" />
                    <div className="bar bar3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

export default HomeIndex;
