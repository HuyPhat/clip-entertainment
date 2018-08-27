import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import VideoActions from '@reducers/video.reducer';

const LinkVideoDetails = ({
  dispatch,
  text,
  href,
  video,
  prefetch = true,
  children
}) => (
  <div>
    <Link
      prefetch
      href={{ pathname: href, query: { videoId: video.videoID || video.id } }}
    >
      <a
        onClick={() => {
          dispatch(VideoActions.setCurrentVideoPlaying(video));
        }}
      >
        {children} {text}
      </a>
    </Link>
    <style jsx>{`
      a {
        color: #fff !important;
      }
    `}</style>
  </div>
);

export default connect()(LinkVideoDetails);
