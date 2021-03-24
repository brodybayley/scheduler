import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });


  // const availableSpots = (val) => {
  //   const dayDisplayed = state.days.find(day => day.name === state.day);
  //   const dayClone = [...state.days];

  //   dayClone.forEach(day => {
  //     if (day.id === dayDisplayed.id) day.spots += val
  //   });

  //   return dayClone;
  // };

  const getSpotsCount = (dayObj, appointments) => {
    console.log('dayObj', dayObj)
    console.log('.days', state.days)
    console.log('.appointments', state.appointments)
    let count = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  }
  //state.day, state.days, appointments
  const updateSpots = (dayName, days, appointments) => {
    const day = days.find((item) => item.name === dayName);
    const unbooked = getSpotsCount(day, appointments);
    const newArr = days.map(item => {
      if (item.name === dayName) {
        return { ...item, spots: unbooked };
      }
      return item;
    });
    return newArr;
  }


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // availableSpots(-1);
    const spots = updateSpots(state.day, state.days, appointments);


    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: spots
        })
      })
  };


  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // availableSpots(1);
    const spots = updateSpots(state.day, state.days, appointments);


    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: spots
        })
      })
  };


  // effect to make get request using axios and update days state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(res => ({
          ...res,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
  }, [])
  return { setDay, bookInterview, cancelInterview, state }
}

