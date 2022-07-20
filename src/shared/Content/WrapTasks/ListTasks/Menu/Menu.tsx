import React from 'react';
import { Dropdown } from '../../../../Dropdown/Dropdown';
import { MenuIcon } from '../../../../Icons/MenuIcon';
import './menu.css';

export function Menu() {
  return (
    <div className="menu">
      <Dropdown
        button={
          <button className="menuButton">
            <MenuIcon />
          </button>
        }
      ></Dropdown>
    </div>
  );
}
