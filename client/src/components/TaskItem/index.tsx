import { InputGroup } from '@blueprintjs/core';
import React, { useRef } from 'react';
import { Task } from '../../api/types';
import { LeftActions, RightActions } from './actions';
import styles from './styles.module.sass';


const TaskItem = (props: { task: Task, onChange: () => void }) => {
  const txtRef = useRef<HTMLInputElement>(null);
  const {task, onChange} = props;
  return (
    <div className={styles.TaskItem}>
      <InputGroup
        asyncControl={true}
        value={props.task.summary}
        inputRef={txtRef}
        rightElement={<RightActions id={ task.id } onRemove={ onChange } />}
        leftElement={<LeftActions id={ task.id } onDone={ onChange } />}
      />
    </div>
  );
};

export default React.memo(TaskItem);
