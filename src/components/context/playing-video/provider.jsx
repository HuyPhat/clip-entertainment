import React from 'react';
import PlayingVideoContext from '@components/context/playing-video/index';

class PlayingVideoProvider extends React.Component {
    state = {
        videoData: this.props.video
    };
    render() {
        return (
            <PlayingVideoContext.Provider value={this.state}>
                {this.props.children}
            </PlayingVideoContext.Provider>
        )
    }
}

export default PlayingVideoProvider;