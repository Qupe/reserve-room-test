import React, {Component} from 'react';
import Switcher from "./components/switcher/switcher";
import Room from "./components/room/room";
import Days from "./components/days/days";
import Names from "./components/names/names";
import './app.css';

const rooms = [
    {
        id: 1,
        name: 'Желтая',
        max_person: 5,
        color: 'yellow'
    },
    {
        id: 2,
        name: 'Красная',
        max_person: 10,
        color: 'red'
    },
    {
        id: 3,
        name: 'Зеленая',
        max_person: 15,
        color: 'green'
    },
    {
        id: 4,
        name: 'Синяя',
        max_person: 20,
        color: 'blue'
    },
    {
        id: 5,
        name: 'Фиолетовая',
        max_person: 25,
        color: 'purple'
    }
];

class App extends Component {

    constructor() {
        super();

        let date = new Date();

        this.state = {
            date: date,
            daysInWeek: this.calcDays(date)
        };
    }

    setDays(date) {
        this.setState({
            date: date,
            daysInWeek: this.calcDays(date)
        });
    }

    calcDays(date) {
        let currentDate = new Date(),
            currentWeekDay = date.getDay(),
            fday = new Date(date.setDate(date.getDate() - (currentWeekDay - 1))).getDate(),
            days = [];

        currentDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < 5; i++) {
            let tmpDate = new Date(date.getFullYear(), date.getMonth(), fday++);
            tmpDate.setHours(0, 0, 0, 0);
            days.push({
                number: tmpDate.getDate(),
                current: tmpDate.getTime() === currentDate.getTime() ? true : false,
                passed: tmpDate < currentDate ? true : false,
                uid: tmpDate.getFullYear() + '_' + tmpDate.getMonth() + '_' + tmpDate.getDate()

            });
        }

        return days;
    }

    render() {
        const roomsList = [];
        const daysList = [];

        rooms.forEach((item, index) => {
            roomsList.push(<Room data={item} key={index}/>);
            daysList.push(<Days data={item} days={this.state.daysInWeek} key={index} index={index}/>)
        });

        return (
            <div className="app">
                <div className="app__sidebar">
                    <div className="app__sidebar-title">Комната</div>
                    <div className="app__rooms">
                        {roomsList}
                    </div>
                </div>
                <div className="app__content">
                    <Switcher date={this.state.date} setDays={this.setDays.bind(this)}/>
                    <div className="app__content-calendar">
                        <Names days={this.state.daysInWeek}/>
                        {daysList}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
