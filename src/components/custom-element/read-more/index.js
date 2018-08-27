import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';

class ReadMore extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            expanded: false,
            truncated: false
        };

        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }

    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }

    toggleLines(event) {
        event.preventDefault();

        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const {
            children,
            more,
            less,
            lines,
            omission
        } = this.props;

        const {
            expanded,
            truncated
        } = this.state;

        // return (
        //     <div>
        //         <Truncate
        //             lines={!expanded && lines}
        //             ellipsis={(
        //                 <span>{ omission } <a href='#' onClick={this.toggleLines}>{more}</a></span>
        //             )}
        //             onTruncate={this.handleTruncate}
        //         >
        //             {children}
        //         </Truncate>
        //         {!truncated && expanded && (
        //             <span> <a href='#' onClick={this.toggleLines}>{less}</a></span>
        //         )}
        //     </div>
        // );
         
        return (
            <div>
                <Truncate
                    lines={!expanded && lines}
                    onTruncate={this.handleTruncate}
                >
                    {children}
                </Truncate>
                {!truncated && expanded && (
                    <span> <a href='#' onClick={this.toggleLines}>{less}</a></span>
                )}
            </div>
        );
        
    }
}

ReadMore.defaultProps = {
    lines: 1,
    more: 'Xem thêm',
    less: 'Rút gọn',
    omission: '...',
    className: ''
};

ReadMore.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.node,
    lines: PropTypes.number
};

export default ReadMore;