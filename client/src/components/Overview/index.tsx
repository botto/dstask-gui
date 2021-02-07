import { InputGroup } from '@blueprintjs/core';
import React, { useRef, useState } from 'react';
import { api } from '../../api/API';
import { Task } from '../../api/types';
import { usePeriodic } from '../../lib/hook-use-periodic';
import AddTask from '../AddTask';
import styles from './styles.module.sass';

const TaskItem = (props: { task: Task }) => {
  const txtRef = useRef<HTMLInputElement>(null);
  const onChange = () => {
    console.log('STUB/handleupdate');
  }
  return (
    <div className={ styles.TaskInput }>
      <InputGroup
        asyncControl={ true }
        value={ props.task.summary }
        onChange={ onChange }
        inputRef={ txtRef }
      />
    </div>
  );
};

const Overview = React.memo(() => {
  const [ taskList, setTaskList ] = useState<Task[]>([]);

  const update = async () => {
    try {
      const list = await api.getTasks();
      setTaskList(list);
    }
    catch (err) {
      window.alert(err)
    }
  };

  usePeriodic(() => update(), 5000);

  return (
    <div>
      { taskList.length > 0 &&
        taskList.map((t: Task, i: number) => <TaskItem key={ i } task={ t } />)
      }
      <AddTask onAdd={ update } />
    </div>
  )
});

export default Overview;
