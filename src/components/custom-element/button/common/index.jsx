import React from 'react';

function withFacebookInit(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {};
    // }

    componentDidMount() {
      window.fbAsyncInit = function() {
        FB.init({
          appId: '1755969684659219',
          cookie: true,
          xfbml: true,
          version: 'v3.1'
        });
        FB.AppEvents.logPageView();
        FB.AppEvents.logEvent('play-video-click');
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');

      this.setState({
        urlShare:
          window.location.protocol +
          '//' +
          window.location.hostname +
          '/video-promotion/' +
          this.props.videoName +
          '-' +
          this.props.videoId
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withFacebookInit;
