import { InputGroup } from '@blueprintjs/core';
import React, { useRef, useState } from 'react';
import { useMutation } from "react-query";
import { api } from '../../api/API';
import { Task } from '../../api/types';
import { LeftActions, RightActions } from './actions';
import styles from './styles.module.sass';

const TaskItem = (props: { task: Task, onChange: () => void }) => {
  const { task, onChange } = props;
  const txtRef = useRef<HTMLInputElement>(null);
  const [ dirty, setDirty ] = useState(false);

  const mutation = useMutation<void, Error, Task>(
    async (newTask:Task) => await api.updateTask(task.id, newTask), 
    {
      onError: (error) => window.alert(error.message),
      onSuccess: () => {
        if (txtRef.current?.value === undefined) {
          return
        }
        onChange();
        setDirty(false);
      },
    }
  );

  const dirtyCheck = () => {
    setDirty(txtRef.current?.value.trim() !== task.summary);
  }

  const updateTask = async () => {
    if (typeof task.id === 'number' && txtRef.current?.value) {
      const newTask = new Task(txtRef.current?.value);
      mutation.mutate(newTask)
    }
  }

  const removeTask = async () => {
    await api.removeTask(task.id);
    onChange();
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && dirty ) {
      updateTask();
    }
  }

  return (
    <div className={ styles.TaskItem }>
      <InputGroup
        asyncControl={ true }
        value={ props.task.summary }
        inputRef={ txtRef }
        onChange={ dirtyCheck }
        onKeyPress= { onKeyPress }
        rightElement={ 
          <RightActions
            id={ task.id }
            onRemove={ removeTask }
            onUpdate={ updateTask }
            isDirty={ dirty }
          />
        }
        leftElement={ <LeftActions id={ task.id } onDone={ onChange } /> }
      />
    </div>
  );
};

export default React.memo(TaskItem);
