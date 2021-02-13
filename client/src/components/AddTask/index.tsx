import { Button, InputGroup, Intent } from '@blueprintjs/core';
import {useMutation} from "react-query";
import React, { useRef, useState } from 'react';
import { api } from '../../api/API';
import { Task } from '../../api/types';


const AddTask = (props: { onAdd: () => void }) => {
  const newTaskInput = useRef<HTMLInputElement>(null);
  const [ showAdd, setShowAdd ] = useState(false);

  const mutation = useMutation<void, Error, Task>(
    async (task:Task) => await api.newTask(task), 
    {
      onError: (error) => window.alert(error.message),
      onSuccess: () => {
        if (newTaskInput.current?.value === undefined) {
          return
        }
        newTaskInput.current.value = '';
        props.onAdd();
      },
    })

  const doAdd = async () => {
    if (newTaskInput.current) {
      const task = new Task(newTaskInput.current?.value!);
      mutation.mutate(task)
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
    <>
      <InputGroup
        placeholder="What are you doing?"
        inputRef={ newTaskInput }
        rightElement={ <AddBtn /> }
        onChange={ onChange }
        onKeyPress={ onKeyPress }
      />
    </>
  )
};

export default AddTask;