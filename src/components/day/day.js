import React, {Component} from 'react';
import Time from '../../components/time/time'
import './day.css';

class Day extends Component {
    constructor(props) {
        super();

        this.uid = props.room + '_' + props.day.uid;
        this.state = {
            '09:00': false,
            '10:00': false,
            '11:00': false,
            '12:00': false,
            '13:00': false,
            '14:00': false,
            '15:00': false,
            '16:00': false,
            '17:00': false,
            '18:00': false
        };
    }

    getReserved() {
        let tmpState = this.state;

        tmpState = Object.assign(tmpState, JSON.parse(localStorage.getItem(this.uid)));
        this.setState(tmpState);
    }

    componentDidMount() {
        this.getReserved();
    }

    setReserved(time) {
        let tmpObj = {};
        let tmpState = this.state;

        tmpObj[time] = true;
        tmpState = Object.assign(tmpState, tmpObj);

        this.setState(tmpState);
        localStorage.setItem(this.uid, JSON.stringify(tmpState));
    }

    render() {
        const passed = this.props.day.passed;
        const className = 'day' + (passed ? ' day_disabled' : '') + (this.props.day.current ? ' day_current' : '');
        const timeList = Object.keys(this.state).map(index =>
            <Time time={index}
                  key={index}
                  passed={passed}
                  reserved={this.state[index]}
                  setReserved={this.setReserved.bind(this)}
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
