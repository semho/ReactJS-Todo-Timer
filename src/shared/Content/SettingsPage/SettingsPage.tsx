import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooksStore';
import { Button } from '../../Button';
import {
  ChangeSettingState,
  changeStatusSettings,
  selectSettings,
} from '../../store/slices/settings';
import { CellSetting } from './CellSetting';
import './settingspage.css';

export function SettingsPage() {
  //возьмем из стора состояние кнопки уведомлений
  const dispatch = useAppDispatch();
  const settings: ChangeSettingState[] = useAppSelector(selectSettings);
  const btn = settings.find((item) => item.id === 'btn');

  const [isEnabled, setIsEnabled] = useState(!btn?.status || false);

  //передаем в стор сосятине кнопки уведомлений
  const handleOnClick = () => {
    setIsEnabled(true);
    dispatch(changeStatusSettings({ id: 'btn', status: isEnabled }));
  };

  const handleOffClick = () => {
    setIsEnabled(false);
    dispatch(changeStatusSettings({ id: 'btn', status: isEnabled }));
  };

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
          <span className="cell-setting__notification-title">Уведомления</span>
          <span>
            Сейчас уведомления{' '}
            {`${!btn?.status ? '"Включены"' : '"Выключены"'}`}
          </span>
          {!isEnabled && (
            <Button
              variant="green"
              type="button"
              title="Включить?"
              onClick={handleOnClick}
            />
          )}
          {isEnabled && (
            <Button
              variant="red"
              type="button"
              title="Выключить?"
              onClick={handleOffClick}
            />
          )}
        </div>
        <div className=" wrap-settings__empty"></div>
      </div>
    </div>
  );
}
