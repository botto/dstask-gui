import React, { useState } from 'react';
import { api } from '../../api/API';
import { Task } from '../../api/types';
import { usePeriodic } from '../../lib/hook-use-periodic';
import AddTask from '../AddTask';
import TaskItem from '../TaskItem';

const Overview = React.memo(() => {
  const [taskList, setTaskList] = useState<Task[]>([]);

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
        taskList.map((t: Task, i: number) => <TaskItem key={i} task={t} onChange={ update } />)
      }
      <AddTask onAdd={update} />
    </div>
  )
});

export default Overview;
