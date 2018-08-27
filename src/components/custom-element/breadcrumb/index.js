import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      <ul>
        {items.map((element, index) => {
          let el = null;
          if (element.type === 'category') {
            let anchor = '';
            switch (element.value) {
              case 'E! Zone':
                anchor = '#ezone-section';
                break;
              case 'Âm nhạc':
                anchor = '#music-section';
                break;
              case 'Giải trí':
                anchor = '#entertainment-section';
                break;
              default:
                anchor = '';
                break;
            }
            el = (
              <li key={index}>
                <a onClick={() => Router.push('/')} href={anchor}>
                  {element.value}
                </a>
              </li>
            );
          } else {
            el = (
              <li key={index}>
                <a>{element.value}</a>
              </li>
            );
          }
          return el;
        })}
      </ul>
      <style jsx>{`
        .breadcrumb {
          font-size: 1rem;
          white-space: nowrap;
        }
        .breadcrumb {
          user-select: none;
        }
        .breadcrumb ul {
          align-items: flex-start;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        li {
          margin: 0;
          padding: 0;
        }
        .breadcrumb li {
          align-items: center;
          display: flex;
          font-size: 14px;
        }
        .breadcrumb li + li::before {
          color: #fff;
          content: '>';
        }
        .breadcrumb a {
          align-item: center;
          color: #fff;
          display: flex;
          justify-content: center;
          padding: 0 0.75em;
          //   font-size: 14px;
        }
      `}</style>
    </nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string, value: PropTypes.string })
  )
};

Breadcrumb.defaultProps = {
  items: []
};
