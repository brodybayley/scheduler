import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  let days = props.days.map((day) =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      // selected={day.name === props.day}
      setDay={props.setDay}
    />)
  return (
    <ul>
      {days}
    </ul>
  )
}