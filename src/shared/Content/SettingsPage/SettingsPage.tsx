import React from 'react';
import { Button } from '../../Button';
import { CellSetting } from './CellSetting';
import './settingspage.css';

export function SettingsPage() {
  return (
    <div className="content__settings-page settings-page">
      <div className="settings-page__title-wrap">
        <h4 className="settings-page__title">Настройки</h4>
      </div>

      <div className="settings-page__wrap-settings">
        <div className="cell-setting wrap-settings__time-tomato time-tomato">
          <CellSetting
            title='Продолжительность "помидора"'
            idInput="input-time-tomato"
          />
        </div>
        <div className="cell-setting wrap-settings__time-rest-short">
          <CellSetting title="Короткий отдых" idInput="input-time-short" />
        </div>
        <div className="cell-setting wrap-settings__time-rest-long">
          <CellSetting title="Длинный отдых" idInput="input-time-long" />
        </div>
        <div className="cell-setting wrap-settings__number-rest-long">
          <CellSetting
            title="Позиция длинного перерыва"
            idInput="input-position-long"
            position={true}
          />
        </div>
        <div className="cell-setting wrap-settings__conrol-notifications">
          <h4 className="cell-setting__title">Уведомления</h4>
          <Button variant="green" type="button" title="Включить?" />
          <Button variant="red" type="button" title="Выключить?" />
        </div>
        <div className=" wrap-settings__empty"></div>
      </div>
    </div>
  );
}
