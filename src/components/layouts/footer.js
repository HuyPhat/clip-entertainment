import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Router from 'next/router';
// const mockedRouter = { push: () => { } }
// Router.router = mockedRouter

import NProgress from 'nprogress';
NProgress.configure({
  showSpinner: false,
  template: `<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`
});

// import { Actions, Utils } from "@popskids-core"

// import CustomElementToastIndex from '@components/custom-element/toast';
import HeadCustom from '@components/layouts/head';
import CustomElementLoadingPage from '@components/custom-element/loading/page';
import Grid from '@material-ui/core/Grid';
import * as _ from 'lodash';

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class LayoutsFooter extends Component {
  constructor(props) {
    super(props);
  }
  getFontStyles() {
    return {
      fontSize: 13
    };
  }

  render() {
    return (
      <div className="container">
        <div className="border-footer">
          <div className="footer">
            <div className="infor-footer row">
              <div className="pops-tv-infor col-md-6">
                <div className="img-wrap-footer">
                  <img
                    className="footer-logo"
                    src="/static/images/header-popstv-logo.png"
                  />
                </div>
                <span className="infor-content">
                  POPS TV thuộc POPS Worldwide - công ty giải trí kỹ thuật số đa
                  kênh và đa nền tảng hàng đầu Đông Nam Á, có trụ sở chính tại
                  TP.HCM và văn phòng tại Bangkok. POPS Worldwide hợp tác với
                  hơn 1.500 đối tác trong và ngoài nước, nhằm xây dựng mạng lưới
                  video mạnh nhất khu vực, thu hút hơn 3,8 tỉ lượt xem mỗi
                  tháng. Tham khảo thêm thông tin tại{' '}
                  <a href="http://www.popsww.com/" target="_blank">
                    www.popsww.com
                  </a>
                </span>
              </div>
              <div className="pops-tv-links col-md-6">
                <div className="categories col-md-6">
                  <h3>POPS TV</h3>
                  <ul>
                    <li>
                      <a
                        onClick={() => Router.push('/')}
                        href="#ezone-section"
                        className="item-cursor"
                      >
                        E! Zone
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => Router.push('/')}
                        href="#music-section"
                        className="item-cursor"
                      >
                        Âm Nhạc
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => Router.push('/')}
                        href="#entertainment-section"
                        className="item-cursor"
                      >
                        Giải Trí
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="social-link col-md-6">
                  <h3>Các kênh liên quan</h3>
                  <ul>
                    <li>
                      <a
                        href="https://www.youtube.com/user/POPSTVVIETNAM"
                        target="_blank"
                      >
                        Youtube
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/POPSTVVIETNAM/?ref=br_rs"
                        target="_blank"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/popsvietnam/"
                        target="_blank"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://plus.google.com/+POPSTVVIETNAM"
                        target="_blank"
                      >
                        Google+
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" target="_blank">
                        Twitter
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="pops-tv-backtotop">
            <div className="wrap">
              <a href="javascript:void(0)">
                <p className="goto-top">
                  <i className="fa fa-arrow-up" />
                  Lên đầu trang
                </p>
              </a>
            </div>
          </div>
          <style jsx>
            {`
              .pops-tv-links {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                text-align: right;
              }
              .infor-content {
                line-height: 1.4;
                display: block;
                font-size: 13px;
                color: #c7c7c7;
              }
              .infor-content a {
                color: #c7c7c7;
                text-decoration: underline;
              }
              .infor-content a:hover {
                color: #e05623;
              }
              .footer li {
                margin-top: 0px;
                margin-right: 0;
                display: block;
              }
              .footer a {
                font-size: 13px;
                line-height: 1.4;
              }
              .footer h3 {
                font-weight: 400;
                color: #c7c7c7;
                font-size: 18px;
                margin-bottom: 15px;
                margin-top: 5px;
              }
              .border-footer:before,
              .border-footer:after {
                content: '';
                width: 100%;
                border: 0.5px solid #fff;
                display: block;
              }
              .border-footer:before {
                margin-top: -12px;
                margin-bottom: 30px;
              }
              .border-footer:after {
                margin-top: 60px;
              }
              .footer {
                color: #c7c7c7 !important;
                max-width: 1130px;
                margin: 0 auto;
                margin-top: 60px;
              }
              .footer li a {
                color: #c7c7c7;
              }
              .footer li a:hover {
                color: #e05623;
              }
              .img-wrap-footer {
                margin-bottom: 15px;
                width: 120px;
              }
              .footer-bottom-copywrite {
                color: #c7c7c7;
                margin: 27px auto;
                font-size: 13px;
                display: block;
                text-align: center;
              }
              .pops-tv-backtotop {
                position: fixed;
                bottom: 85px;
                right: 0;
                width: 100%;
                display: none;
              }
              @keyframes mymove {
                from {
                  transform: translateY(0px);
                  opacity: 0;
                }
                to {
                  transform: translateY(-10px);
                  opacity: 1;
                }
              }
              .pops-tv-backtotop .wrap .fa {
                display: block;
                text-align: center;
                transition: all 0.3s ease;
                -webkit-animation: mymove 1s infinite; /* Safari 4.0 - 8.0 */
                animation: mymove 1s infinite;
              }
              .pops-tv-backtotop .wrap {
                max-width: 1000px;
                padding: 0 15px;
                margin: 0px auto;
                text-align: right;
              }
              .goto-top {
                font-size: 14px;
                color: #c7c7c7;
                transform: translateX(125%);
                display: inline-block;
              }
              .footer .categories,
              .footer .social-link {
                padding-left: 0;
                padding-right: 0;
              }
              .footer ul {
                margin-top: 0;
                display: block;
              }
              @media screen and (max-width: 1299px) {
                .footer {
                  width: 100%;
                  max-width: 100%;
                }
              }
              @media screen and (max-width: 812px) {
                .pops-tv-backtotop .wrap {
                  text-align: left;
                  padding: 30px 0 0;
                }
                .pops-tv-backtotop {
                  position: relative;
                }
                .goto-top {
                  transform: translateX(0);
                }
                .pops-tv-infor,
                .pops-tv-links,
                .pops-tv-backtotop {
                  width: 100%;
                  flex: auto;
                  max-width: 100%;
                }
                .infor-content {
                  padding-right: 0;
                }
              }
              @media screen and (max-width: 768px) {
                .img-wrap-footer {
                  margin: 0px auto 25px auto;
                }
                .footer ul {
                  margin-top: 0px;
                }
                .footer li {
                  margin-top: 5px;
                  display: inline-block;
                  margin-right: 10px;
                }
                .footer h3 {
                  margin-bottom: 5px;
                  margin-top: 30px;
                }

                .footer-bottom-copywrite {
                  margin: 17px auto;
                }

                .goto-top {
                  text-align: center;
                  margin-top: 15px;
                }

                .border-footer:after {
                  margin-top: 15px;
                }
              }
              @media screen and (max-width: 667px) {
                .pops-tv-infor,
                .pops-tv-links {
                  display: block;
                }
              }
            `}
          </style>
        </div>
        <div className="copy-right">
          <span className="footer-bottom-copywrite">
            ©2018, POPS TV. All rights reserved.
          </span>
        </div>
      </div>
    );
  }
}

export default LayoutsFooter;
