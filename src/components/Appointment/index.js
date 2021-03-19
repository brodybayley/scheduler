import React from "react";
import "components/Appointment/styles.scss";
import Status from './Status';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form";
import Confirm from "./Confirm";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => transition(SHOW));
  }

  const confirmDeletion = () => transition(DELETING);

  const deleteInterview = function () {
    props.cancelInterview(props.id)
      .then(res => transition(EMPTY));
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDeletion}
        />
      )}
      { mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      { mode === SAVING && (
        <Status
          message={'SAVING'}
        />
      )}
      { mode === DELETING && (
        <Confirm
          message={'Delete the appointment?'}
          onConfirm={deleteInterview}
          onCancel={() => back()}
        />
      )}
    </article>
  )
}