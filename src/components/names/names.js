import React, {Component} from 'react';
import './names.css';

const names = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница'
];

class Names extends Component {
    render() {
        const namesList = names.map((item, index) =>
            <div className={'names__item' + (this.props.days[index].current ? ' names__item_current' : '')}
                 key={index}>
                {this.props.days[index].number + ' ' + item}
            </div>);

        return (
            <div className="names">
                {namesList}
            </div>
        )
    }
}

export default Names;
