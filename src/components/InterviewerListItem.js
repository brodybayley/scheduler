import React from 'react';
import 'components/InterviewerListItem.scss';
import classnames from 'classnames/bind';

export default function InterviewerListItem(props) {
  const listItem = classnames("InterviewerListItem", {
    "interviewers__item": props.id,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={listItem} onClick={() => props.setInterviewer(props.id)}>
      <img
        className={props.name}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}