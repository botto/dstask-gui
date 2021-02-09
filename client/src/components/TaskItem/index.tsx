import { Alignment, Button, Checkbox, InputGroup } from '@blueprintjs/core';
import React, { useRef, useState } from 'react';
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

const LeftActions = React.memo((props: {id: number, onDone: () => void}) => {
  const {id, onDone} = props;
  const [isChecked, setChecked] = useState(false);

  const completeTask = async () => {
    if (!isNaN(id)) {
      await api.taskDone(id);
      setChecked(false)
      onDone();
    }
  }

  const onChange = () => {
    setChecked(!isChecked)
    completeTask()
  }

  return (
    <div>
      <Checkbox className={ styles.TaskCheckbox } checked={ isChecked } onChange={ onChange } alignIndicator={ Alignment.CENTER } />
    </div>
  )

})

const TaskItem = (props: { task: Task, onChange: () => void }) => {
  const txtRef = useRef<HTMLInputElement>(null);
  const {task, onChange} = props;
  return (
    <div className={styles.TaskItem}>
      <InputGroup
        asyncControl={true}
        value={props.task.summary}
        inputRef={txtRef}
        rightElement={<RightButtons id={ task.id } onDelete={ onChange } />}
        leftElement={<LeftActions id={ task.id } onDone={ onChange } />}
      />
    </div>
  );
};

export default React.memo(TaskItem);
