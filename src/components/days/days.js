import React, {Component} from 'react';
import Day from "../day/day";
import './days.css'

class Days extends Component {
    render() {
        const daysList = this.props.days.map(day =>
            <Day day={day} key={day.uid} room={this.props.data.id}/>
        );

        return (
            <div className="days">
                {daysList}
            </div>
        );
    }
}

export default Days;
