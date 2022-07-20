import React from 'react';
import { DownIcon } from '../../../../../Icons/DownIcon';
import { EIcons, Icon } from '../../../../../Icons/Icon';
import './menuitemslist.css';

interface IMenuItemsListProps {
  idTask?: string | null;
}

export function MenuItemsList({ idTask }: IMenuItemsListProps) {
  return (
    <ul className="menuItemsList">
      <li className="menuItem">
        <Icon name={EIcons.up} size={18} color={'#A8B64F'} />
        Увеличить
      </li>
      <li className="menuItem">
        <DownIcon />
        Уменьшить
      </li>
      <li className="menuItem" onClick={() => console.log(idTask)}>
        <Icon name={EIcons.edit} size={18} color={'#A8B64F'} />
        Редактировать
      </li>
      <li className="menuItem">
        <Icon name={EIcons.delete} size={18} color={'#A8B64F'} />
        Удалить
      </li>
    </ul>
  );
}
