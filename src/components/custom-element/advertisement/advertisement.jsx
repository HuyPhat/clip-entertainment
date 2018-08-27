import React, { Component } from 'react';

function Advertisement({ titleStyle }) {
  return (
    <div className={titleStyle}>
      <div className="wrap-img-ad">
        <a>
          <img
            justify="center"
            className="img-advertise"
            src="/static/images/img-advertisement1.png"
          />
        </a>
      </div>

      <style jsx>{`
        .wrap-img-ad {
          height: 92px;
        }
        @media only screen and (max-width: 768px) {
          .wrap-img-ad {
            height: 40px;
          }
        }
        .img-advertise {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default Advertisement;
