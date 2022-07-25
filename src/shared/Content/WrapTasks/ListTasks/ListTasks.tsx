import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  useEffect(() => {
    const handlerClickListItem = (event: MouseEvent) => {
      //получаем элемент списка - задачу
      const task = (event.target as HTMLElement).closest('.item-task__wrap');
      //выделяем отдельный эленты в задаче - меню
      const menu = (event.target as HTMLElement).closest('.menu');
      //если мы нажали на задачу и при этом не попав на меню
      if (!menu) {
        if (!task) return;
        //id задачи по которой нажали
        const idTask = (task.parentElement as HTMLElement).id;
        //отправляемся на роут с таймером
        navigate(`/timer/${idTask}`);
      }
    };

    document.addEventListener('click', handlerClickListItem);

    return () => {
      document.removeEventListener('click', handlerClickListItem);
    };
  }, [navigate]);

  return (
    <div className="wrap-tasks__list-tasks list-tasks">
      <ul className="list-tasks__list">
        {tasks.map((item) => (
          <li
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
