import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/hooksStore';
import {
  ChangeSettingState,
  selectSettings,
} from '../../../store/slices/settings';
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
  const settings: ChangeSettingState[] = useAppSelector(selectSettings);
  const currentTimeTask = settings.find(
    (item) => item.id === 'input-time-tomato'
  );

  //константа времени на один таймер задачи
  const TIME_TASK = Number(currentTimeTask?.time) || 25;
  //полуаем все задачи из store
  const tasks: ITaskProps[] = useAppSelector(selectTask);
  //получаем сколько всего помидорок у задач и умножаем на минуты для одного таймера
  const sumTimeTaskMinutes =
    tasks.reduce((a, b) => +a + +b.count, 0) * TIME_TASK;
  //получаем общее время для выполнения всех задач
  const sumTimeTask = getTimeFromMinutes(sumTimeTaskMinutes);
  const [isShowTimeTasks, setIsShowTimeTasks] = useState(false);

  useEffect(() => {
    if (sumTimeTask !== '0 мин') {
      setIsShowTimeTasks(true);
    } else {
      setIsShowTimeTasks(false);
    }
  }, [sumTimeTask]);

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

      <div
        className={`${
          isShowTimeTasks
            ? 'wrap-tasks__all-time--active'
            : 'wrap-tasks__all-time'
        }`}
      >
        {isShowTimeTasks ? sumTimeTask : ''}
      </div>
    </div>
  );
}

/**
 * Функция преобразовывает число в минутах в строку в формате "ХХ час ХХ мин"
 * @param min - принимает число минут всего
 * @returns - возвращает строку вида (часы минуты)
 */
function getTimeFromMinutes(min: number): string {
  const hours = Math.trunc(min / 60);
  const minutes = min % 60;
  if (hours === 0) {
    return minutes + ' мин';
  }
  return hours + ' час ' + minutes + ' мин';
}
