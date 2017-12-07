import React, {Component} from 'react';
import './room.css'

class Room extends Component {
    render() {
        const className = 'room' + (this.props.data.color ? ' room_' + this.props.data.color : '');

        return (
            <div className={className}>
                <div className="room__text">
                    <b>{this.props.data.name}</b><br/>
                    (до {this.props.data.max_person} персон)
                </div>
            </div>
        )
    }
}

export default Room;
