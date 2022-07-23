import React from 'react';
import { useAppSelector } from '../../../../hooks/hooksStore';
import { selectTask } from '../../../store/slices/tasks';
import './listtasks.css';
import { Menu } from './Menu';

export function ListTasks() {
  const count = useAppSelector(selectTask);
  console.log(count);
  return (
    <div className="wrap-tasks__list-tasks list-tasks">
      <ul className="list-tasks__list">
        <li className="list-tasks__item-task item-task" key={1} id={'1'}>
          <div className="item-task__wrap">
            <span className="item-task__count">1</span>
            Сверстать сайт
            <Menu />
          </div>
        </li>
        <li className="list-tasks__item-task item-task" key={2} id={'2'}>
          <div className="item-task__wrap">
            <span className="item-task__count">1</span>
            Проверить валидность
            <Menu />
          </div>
        </li>
      </ul>
    </div>
  );
}
