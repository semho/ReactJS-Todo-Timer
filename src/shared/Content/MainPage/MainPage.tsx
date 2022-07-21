import React from 'react';
import { Timer } from '../Timer';
import { WrapTasks } from '../WrapTasks';
import { FormTasks } from '../WrapTasks/FormTasks';
import { ListTasks } from '../WrapTasks/ListTasks';
import { Manual } from '../WrapTasks/Manual';
import './mainpage.css';

export function MainPage() {
  return (
    <div className="content__main-page">
      <WrapTasks>
        <Manual />
        <FormTasks />
        <ListTasks />
      </WrapTasks>
      <Timer />
    </div>
  );
}
