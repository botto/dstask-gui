import { Alignment, Button, Checkbox } from '@blueprintjs/core';
import React, { useState } from 'react';
import { api } from '../../api/API';
import styles from './styles.module.sass';

interface RightActionsProps {
  id: number
  isDirty: boolean

  onRemove: () => void
  onUpdate: () => void
}

export const RightActions = React.memo((props: RightActionsProps) => {
  return (
    <>
      { props.isDirty &&
        <Button
          intent='warning'
          text='Update'
          minimal={ true }
          icon='edit'
          onClick={ props.onUpdate }
        />
      }
      <Button
        data-testid="task-remove"
        intent='danger'
        onClick={ props.onRemove }
        text='Remove'
        icon='cross'
        minimal={ true }
      />
    </>
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