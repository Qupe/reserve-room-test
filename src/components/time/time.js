import React, {Component} from 'react';
import './time.css'

class Time extends Component {
    onTimeClickHandler() {
        if (!this.props.passed) {
            this.props.toggleReserved(this.props.time)
        }
    }

    render() {
        let add = null;
        let className = 'time';
        className += this.props.passed ? ' time_disabled' : '';
        className += this.props.reserved ? ' time_reserved' : '';

        if (!this.props.passed) {
            add = <span className="time__plus"> +</span>;
        }

        return (
            <div className={className}
                 onClick={this.onTimeClickHandler.bind(this)}>
                {this.props.time + ':00'}
                {add}
            </div>
        );
    }
}

export default Time;
