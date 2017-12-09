import React, {Component} from 'react';
import Time from '../../components/time/time'
import './day.css';

class Day extends Component {
    constructor(props) {
        super();

        this.uid = props.room + '_' + props.day.uid;
        this.state = {
            '9': false,
            '10': false,
            '11': false,
            '12': false,
            '13': false,
            '14': false,
            '15': false,
            '16': false,
            '17': false,
            '18': false
        };
    }

    getReserved() {
        return JSON.parse(localStorage.getItem(this.uid)) || {};
    }

    componentDidMount() {
        this.setState(this.getReserved());
        this.time = this.props.date.getHours();
    }

    componentWillReceiveProps(nextProps) {
        this.time = nextProps.date.getHours();
    }

    toggleReserved(time) {
        let reserved = this.getReserved();

        reserved[time] ? reserved[time] = false : reserved[time] = true;
        localStorage.setItem(this.uid, JSON.stringify(reserved));
        this.setState(reserved);
    }

    render() {
        const passed = this.props.day.passed;
        const className = 'day' + (passed ? ' day_disabled' : '') + (this.props.day.current ? ' day_current' : '');
        const timeList = Object.keys(this.state).map(index =>
            <Time time={index}
                  key={index}
                  passed={passed || (this.time > +index && this.props.day.current)}
                  reserved={this.state[index]}
                  toggleReserved={this.toggleReserved.bind(this)}
            />
        );

        return (
            <div className={className}>
                {timeList}
            </div>
        );
    }
}

export default Day;
