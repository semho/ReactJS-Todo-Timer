import React, { useEffect } from 'react';
import './bodydropdown.css';
import { MenuItemsList } from '../../Content/WrapTasks/ListTasks/Menu/MenuItemsList';

interface IBodyDropdown {
  onClose?: () => void;
  idTask?: string | null;
}

export function BodyDropdown({ onClose, idTask }: IBodyDropdown) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const menu = target.closest('button');
      if (!menu || !document.contains(menu)) {
        onClose?.();
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return (
    <div className="dropdown">
      <MenuItemsList idTask={idTask} />
    </div>
  );
}
