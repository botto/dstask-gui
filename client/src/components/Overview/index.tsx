import React from 'react';
import { useQuery } from "react-query";
import { api } from '../../api/API';
import { Task } from '../../api/types';
import AddTask from '../AddTask';
import TaskItem from '../TaskItem';

const Overview = React.memo(() => {
  const {data:taskList, error, refetch} = useQuery<Task[], Error>('taskList', async() => await api.getTasks(), {refetchInterval: 5000})

  if (error) {
    return (<div>Error Loading Task List: {error.message}</div>)
  }

  return (
    <div>
      { taskList !== undefined && taskList.length > 0 &&
        taskList.map((t: Task, i: number) => <TaskItem key={ i } task={ t } onChange={ refetch }/>)
      }
      <AddTask onAdd={ refetch } />
    </div>
  )
});

export default Overview;
