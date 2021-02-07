import { Button, InputGroup, Intent } from '@blueprintjs/core';
import React, { useRef, useState } from 'react';
import { api } from '../../api/API';
import { Task } from '../../api/types';


const AddTask = (props: { onAdd: () => void }) => {
  const newTaskInput = useRef<HTMLInputElement>(null);
  const [ showAdd, setShowAdd ] = useState(false);

  const doAdd = async () => {
    if (newTaskInput.current) {
      const task = new Task(newTaskInput.current?.value!);
      try {
        await api.newTask(task);
        newTaskInput.current.value = '';
        props.onAdd();
      }
      catch (e) {
        window.alert(e)
      }
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      doAdd();
    }
  }

  const onChange = () => {
    if (newTaskInput.current) {
      setShowAdd(newTaskInput.current.value.trim().length > 0);
    }
  };

  const AddBtn = () => (showAdd ? <Button
    minimal={ true }
    text="Add"
    intent={ Intent.PRIMARY }
    icon='plus'
    onClick={ doAdd }
    type='submit'
  /> : null);

  return (
    <div>
      <InputGroup
        placeholder="What are you doing?"
        inputRef={ newTaskInput }
        rightElement={ <AddBtn /> }
        onChange={ onChange }
        onKeyPress={ onKeyPress }
      />
    </div>
  )
};

export default AddTask;