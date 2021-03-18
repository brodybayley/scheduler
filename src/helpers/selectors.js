import React from 'react';

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(actualDay => actualDay.name === day);
  if (!filteredDays) {
    return [];
  }
  return filteredDays.appointments.map(aptID => state.appointments[aptID]);
}