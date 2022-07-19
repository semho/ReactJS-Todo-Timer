import React from 'react';
import './listtasks.css';

export function ListTasks() {
  return (
    <div className='wrap-tasks__list-tasks list-tasks'>
      <ul className='list-tasks__list'>
        <li className='list-tasks__item-task item-task'>
          <div className='item-task__wrap'>
            <span className='item-task__count'>1</span>
            Сверстать сайт
          </div>
        </li>
        <li className='list-tasks__item-task item-task'>
          <div className='item-task__wrap'>
            <span className='item-task__count'>1</span>
            Проверить валидность
          </div>
        </li>
      </ul>
    </div>
  );
}
