import { Button, InputGroup } from '@blueprintjs/core';
import React, { useRef } from 'react';
import { api } from '../../api/API';
import { Task } from '../../api/types';
import styles from './styles.module.sass';

const RightButtons = React.memo((props: { id: number, onDone: () => void }) => {
  const doneTask = async () => {
    if (!isNaN(props.id)) {
      await api.doneTask(props.id);
      props.onDone();
    }
  };
  return (
    <div>
      <Button
        intent='success'
        onClick={ doneTask }
        text='Done'
        icon='tick'
        minimal={ true }
      />
    </div>
  )
});

const TaskItem = (props: { task: Task, onChange: () => void }) => {
  const txtRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.TaskItem}>
      <InputGroup
        asyncControl={true}
        value={props.task.summary}
        inputRef={txtRef}
        rightElement={<RightButtons id={ props.task.id } onDone={ props.onChange } />}
      />
    </div>
  );
};

export default React.memo(TaskItem);