import React, { useState, useEffect } from "react";
import Axios from 'axios';

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from './DayList';


const appointments = [
  {
    id: 4,
    time: "9am",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 2,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  // effect to make get request using axios and update days state
  useEffect(() => {
    Axios.get('/api/days')
      .then(response => {
        setDays([...response.data])
      })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          appointments.map(appointment =>
            <Appointment
              key={appointment.id}
              {...appointment}
            />
          )}
        < Appointment key="last" time="5pm" />
      </section>
    </main >
  );
}


