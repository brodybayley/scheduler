export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find((actualDay) => actualDay.name === day);
  if (!filteredDays) {
    return [];
  }
  return filteredDays.appointments.map((aptID) => state.appointments[aptID]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.find((actualDay) => actualDay.name === day);
  if (!filteredDays) {
    return [];
  }
  return filteredDays.interviewers.map((aptID) => state.interviewers[aptID]);
}
