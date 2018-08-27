import React from 'react';
import PlayingVideoContext from '@components/context/playing-video/index';

class PlayingVideoConsumer extends React.Component {
    render() {
        return (
            <PlayingVideoContext.Consumer>
                {/* {state => <Button {...props} theme={theme} />} */}
                {state => this.props.children(state)}
            </PlayingVideoContext.Consumer>
        )
    }
}

export default PlayingVideoConsumer;