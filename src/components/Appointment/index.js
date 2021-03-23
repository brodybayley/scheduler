import React from "react";
import "components/Appointment/styles.scss";
import Status from './Status';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDITING = "EDITING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  }

  const deleteInterview = () => transition(CONFIRM);

  const confirmDeletion = function () {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
          onEdit={() => transition(EDITING)}
        />
      )}
      { mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      { mode === SAVING && (
        <Status
          message={'Saving'}
        />
      )}
      { mode === DELETING && (
        <Status
          message={'Delete the appointment?'}
        />
      )}
      { mode === CONFIRM && (
        <Confirm
          message={"Delete the appointment?"}
          onConfirm={confirmDeletion}
          onCancel={back}
        />
      )}
      { mode === EDITING && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer}
          onSave={save}
          onCancel={back}
        />
      )}
      { mode === ERROR_DELETE && (
        <Error
          message={"Could not delete appointment"}
          onClose={back}
        />
      )}
      { mode === ERROR_SAVE && (
        <Error
          message={"Could not save"}
          onClose={back}
        />
      )}
    </article>
  )
}