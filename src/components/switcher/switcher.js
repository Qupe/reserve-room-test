import React, {Component} from 'react';
import './switcher.css'

class Switcher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.formatTitle(props.date)
        };
    }

    _switch(action) {
        let date = this.props.date;

        if (action === 'next') {
            date.setDate(date.getDate() + 7)
        } else if (action === 'prev') {
            date.setDate(date.getDate() - 7)
        }

        this.props.setDays(date);
        this.setState({
            title: this.formatTitle(date)
        });
    }

    formatTitle(date) {
        return date.toLocaleString('ru', {month: 'long'}) + ' ' + date.getFullYear();
    }

    render() {
        return (
            <div className="switcher">
                <div className="switcher__button switcher__button_prev" onClick={this._switch.bind(this, 'prev')}>
                    <svg className="switcher__button-icon">
                        <path d="M 17,12 l -5,5 l 5,5"></path>
                    </svg>
                </div>
                {this.state.title}
                <div className="switcher__button switcher__button_next" onClick={this._switch.bind(this, 'next')}>
                    <svg className="switcher__button-icon">
                        <path d="M 14,12 l 5,5 l -5,5"></path>
                    </svg>
                </div>
            </div>
        )
    }
}

export default Switcher;
