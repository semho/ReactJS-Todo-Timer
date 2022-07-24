import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../../../hooks/hooksStore';
import {
  addTimeTask,
  changeTask,
  downTimeTask,
} from '../../../../../store/slices/tasks';
import { DownIcon } from '../../../../../Icons/DownIcon';
import { EIcons, Icon } from '../../../../../Icons/Icon';
import { useNavigate } from 'react-router-dom';
import './menuitemslist.css';

interface IMenuItemsListProps {
  idTask: string;
}

export function MenuItemsList({ idTask }: IMenuItemsListProps) {
  useEffect(() => {
    //меню задачи
    const menu = document.querySelector('.menuItemsList');
    if (!menu) return;
    //кнопка уменьшения "помидор"
    const btnDown = menu.querySelector('.menuItem__down');
    (btnDown as HTMLButtonElement).disabled = true;
    //сама задача в DOM
    const task = document.getElementById(idTask);
    //количество "помидор"
    const counter = task?.querySelector('.item-task__count');
    let textCounter = '';
    //приводим к строке
    if (counter && counter.textContent !== null) {
      textCounter = counter.textContent;
    }
    //теперь к числу
    const count = parseInt(textCounter, 10);
    //если повторений задачи будет больше одного раза
    if (count > 1) {
      //повесим класс на кнопку убалнения
      btnDown?.classList.add('menuItem__down--green');
      //уберем блокировку
      (btnDown as HTMLButtonElement).disabled = false;
    }
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function deleteTask() {
    navigate(`/tasks/${idTask}?method=delete`);
  }

  function upTime() {
    dispatch(addTimeTask(idTask));
  }

  function downTime() {
    dispatch(downTimeTask(idTask));
  }

  function changeTitle() {
    navigate(`/tasks/${idTask}?method=put`);
    // dispatch(changeTask(idTask));
  }

  return (
    <div className="menuItemsList">
      <button className="menuItem" onClick={upTime}>
        <Icon name={EIcons.up} size={18} color={'#A8B64F'} />
        Увеличить
      </button>
      <button className="menuItem menuItem__down" onClick={downTime}>
        <DownIcon />
        Уменьшить
      </button>
      <button className="menuItem" onClick={changeTitle}>
        <Icon name={EIcons.edit} size={18} color={'#A8B64F'} />
        Редактировать
      </button>
      <button className="menuItem" onClick={deleteTask}>
        <Icon name={EIcons.delete} size={18} color={'#A8B64F'} />
        Удалить
      </button>
    </div>
  );
}
