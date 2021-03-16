import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  let interviewerArray = props.interviewers.map((interviewer) =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
    />)
  return (
    <ul>
      {interviewerArray}
    </ul>
  )
}