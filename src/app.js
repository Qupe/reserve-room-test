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
            daysInMonth: this.calcDays(date)
        };
    }

    setDays(currentDate) {
        this.setState({
            date: currentDate,
            daysInMonth: this.calcDays(currentDate)
        });
    }

    calcDays(currentDate) {
        let date = new Date(),
            currentWeekDay = currentDate.getDay(),
            currentDay = currentDate.getDate(),
            days = [];

        date.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        days.push({
            number: currentDay,
            current: currentDate.getTime() === date.getTime() ? true : false,
            passed: currentDate < date ? true : false,
            uid: currentDate.getFullYear() + '_' + currentDate.getMonth() + '_' + currentDate.getDate()
        });

        while (currentWeekDay > 1) {
            let tmpDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), --currentDay);
            currentWeekDay--;
            days.unshift({
                number: tmpDate.getDate(),
                current: false,
                passed: tmpDate < date ? true : false,
                uid: tmpDate.getFullYear() + '_' + tmpDate.getMonth() + '_' + tmpDate.getDate()
            })
        }

        currentWeekDay = currentDate.getDay();
        currentDay = currentDate.getDate();

        while (currentWeekDay < 5) {
            let tmpDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), ++currentDay);
            currentWeekDay++;
            days.push({
                number: tmpDate.getDate(),
                current: false,
                passed: tmpDate < date ? true : false,
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
            daysList.push(<Days data={item} days={this.state.daysInMonth} key={index} index={index}/>)
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
                        <Names days={this.state.daysInMonth}/>
                        {daysList}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
