import React, { Component } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Actions, Utils } from '@popskids-core';
import * as _ from "lodash";

export default ({
  title = "POPS TV",
  description = "Ứng dụng xem video trực tuyến tốt nhất.",
  type = "article",
  url = "https://m.popskids.tv/",
  hostname = "m.popskids.tv",
  image = "https://cdn.popsww.com/popskids/webapp/images/default/img_share_default.jpg",
  tag = ""
}) => (
  <Head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="/static/pops_favicon.ico" />

    <meta property="fb:app_id" content="1755969684659219" />

    <meta name="copyright" content="POPS WORLDWIDE" />
    <meta name="author" content="POPS WORLDWIDE" />
    <meta name="description" content={description} />
    {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0 ,user-scalable=no"
    />

    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} itemProp="thumbnailUrl" />
    <meta property="og:image:alt" content={title} />
    <meta property="og:title" content={title} itemProp="headline" />
    <meta property="og:type" content={type} />
    <meta
      property="og:site_name"
      content="POPS WORLDWIDE - LEADING DIGITAL ENTERTAINMENT IN SOUTHEAST ASIA"
    />
    <meta
      property="og:description"
      content={_.truncate(description, {
        length: 160,
        separator: " ",
        omission: " ..."
      })}
      itemProp="description"
    />
    <meta property="og:url" itemProp="url" content={url} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content={title} />
    <meta name="twitter:creator" content={title} />

    {type == "video" ? (
      <div>
        <meta property="og:image:width" content="470" />
        <meta property="og:image:height" content="246" />
        <meta property="og:site_name" content={title} />

        <meta property="og:video:url" content={url} />
        <meta property="og:video:type" content={type} />
        <meta property="og:video:tag" content={tag} />
      </div>
    ) : (
      ""
    )}
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.5.0/flexslider.min.css"
      rel="stylesheet"
    />

    <link
      rel="stylesheet"
      type="text/css"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />
    <link
      rel="stylesheet"
      href="https://vjs.zencdn.net/5.4.6/video-js.css?clear=1"
    />
    <link
      rel="stylesheet"
      href="/static/vast-vpaid/videojs.vast.vpaid.min.css"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap-grid.css"
    />
    <style>
      @import
      url('https://fonts.googleapis.com/css?family=Playfair+Display:700i');
    </style>

    {/*<script src="https://vjs.zencdn.net/5.4.6/video.js"></script>*/}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" />
    <script src="https://cdn.popsww.com/popskids/webapp/js/videojs/dist/video.js" />
    <script src="https://cdn.popsww.com/popskids/webapp/js/videojs/dist/youtube.js" />
    <script src="https://cdn.popsww.com/popskids/webapp/js/videojs/dist/hls.js" />
    <script src="https://cdn.popsww.com/popskids/webapp/js/vast-vpaid/es5-shim.js" />
    <script src="https://cdn.popsww.com/popskids/webapp/js/vast-vpaid/ie8fix.js" />
    <script src="https://cdn.popsww.com/popskids/webapp/js/vast-vpaid/videojs_5.vast.vpaid.js" />
    <script src="http://vjs.zencdn.net/5-unsafe/video.js" />
  </Head>
);
