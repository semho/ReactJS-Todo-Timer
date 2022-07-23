import React from 'react';
import { useAppSelector } from '../../../../hooks/hooksStore';
import { selectTask } from '../../../store/slices/tasks';
import './listtasks.css';
import { Menu } from './Menu';

interface ITaskProps {
  text?: string;
  id: string;
  time: number;
  count: number;
}

export function ListTasks() {
  const tasks: ITaskProps[] = useAppSelector(selectTask);

  return (
    <div className="wrap-tasks__list-tasks list-tasks">
      <ul className="list-tasks__list">
        {tasks.map((item) => (
          <li
            // onClick={() => itemClick(item)}
            key={item.id}
            id={item.id}
            className="list-tasks__item-task item-task"
          >
            <div className="item-task__wrap">
              <span className="item-task__count">{item.count}</span>
              {item.text}
              <Menu />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
