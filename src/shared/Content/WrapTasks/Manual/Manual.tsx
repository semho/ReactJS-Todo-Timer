import React from 'react';
import './manual.css';

export function Manual() {
  return (
    <div className='wrap-tasks__manual'>
      <h4 className='wrap-tasks__title'>Ура! Теперь можно начать работать:</h4>
      <ul className='wrap-tasks__list-manual list-manual'>
        <li className='list-manual__item'>Выберите категорию и напишите название текущей задачи</li>
        <li className='list-manual__item'>Запустите таймер («помидор»)</li>
        <li className='list-manual__item'>Работайте пока «помидор» не прозвонит</li>
        <li className='list-manual__item'>Сделайте короткий перерыв (3-5 минут)</li>
        <li className='list-manual__item'>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
      </ul>
    </div>
  );
}
