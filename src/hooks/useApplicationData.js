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


  const availableSpots = (val) => {
    const dayDisplayed = state.days.find(day => day.name === state.day);
    const dayClone = [...state.days];

    dayClone.forEach(day => {
      if (day.id === dayDisplayed.id) day.spots += val
    });

    return dayClone;
  };


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    availableSpots(-1);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
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
    availableSpots(1);

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments,
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

