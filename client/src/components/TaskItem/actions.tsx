import { Alignment, Button, Checkbox } from '@blueprintjs/core';
import React, { useState } from 'react';
import { api } from '../../api/API';
import styles from './styles.module.sass';

export const RightActions = React.memo((props: { id: number, onRemove: () => void }) => {
  const removeTask = async () => {
    if (!isNaN(props.id)) {
      await api.removeTask(props.id);
      props.onRemove();
    }
  };
  return (
    <div>
      <Button
        data-testid="task-remove"
        intent='danger'
        onClick={ removeTask }
        text='Remove'
        icon='cross'
        minimal={ true }
      />
    </div>
  );
});

export const LeftActions = React.memo((props: {id: number, onDone: () => void}) => {
  const {id, onDone} = props;
  const [isChecked, setChecked] = useState(false);

  const completeTask = async () => {
    if (!isNaN(id)) {
      await api.doneTask(id);
      setChecked(false)
      onDone();
    }
  };

  const onChange = () => {
    setChecked(!isChecked)
    completeTask()
  };

  return (
    <div>
      <Checkbox 
        data-testid="task-done"
        className={ styles.TaskCheckbox }
        checked={ isChecked } 
        onChange={ onChange }
        alignIndicator={ Alignment.CENTER }
      />
    </div>
  );
});