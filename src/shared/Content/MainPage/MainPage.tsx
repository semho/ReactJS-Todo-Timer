import React from 'react';
import { Outlet } from 'react-router-dom';
import { WrapTasks } from '../WrapTasks';
import { FormTasks } from '../WrapTasks/FormTasks';
import { ListTasks } from '../WrapTasks/ListTasks';
import { Manual } from '../WrapTasks/Manual';
import { WrapTimer } from '../WrapTimer';
import './mainpage.css';

export function MainPage() {
  return (
    <div className="content__main-page">
      <WrapTasks>
        <Manual />
        <FormTasks />
        <ListTasks />
      </WrapTasks>
      <WrapTimer>
        <Outlet />
      </WrapTimer>
    </div>
  );
}
