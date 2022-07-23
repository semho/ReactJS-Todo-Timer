import React from 'react';
import { useAppDispatch } from '../../../../../../hooks/hooksStore';
import { removeTask } from '../../../../../store/slices/tasks';
import { DownIcon } from '../../../../../Icons/DownIcon';
import { EIcons, Icon } from '../../../../../Icons/Icon';
import { useNavigate } from 'react-router-dom';
import './menuitemslist.css';

interface IMenuItemsListProps {
  idTask: string;
}

export function MenuItemsList({ idTask }: IMenuItemsListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function deleteTask() {
    // dispatch(removeTask(idTask));
    navigate(`/tasks/${idTask}`);
  }
  return (
    <ul className="menuItemsList">
      <li className="menuItem" onClick={() => console.log(idTask)}>
        <Icon name={EIcons.up} size={18} color={'#A8B64F'} />
        Увеличить
      </li>
      <li className="menuItem" onClick={() => console.log(idTask)}>
        <DownIcon />
        Уменьшить
      </li>
      <li className="menuItem" onClick={() => console.log(idTask)}>
        <Icon name={EIcons.edit} size={18} color={'#A8B64F'} />
        Редактировать
      </li>
      <li className="menuItem" onClick={deleteTask}>
        <Icon name={EIcons.delete} size={18} color={'#A8B64F'} />
        Удалить
      </li>
    </ul>
  );
}
