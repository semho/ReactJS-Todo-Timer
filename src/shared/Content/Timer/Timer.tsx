import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooksStore';
import { useInterval } from '../../../hooks/useInterval';
import { Button } from '../../Button';
import { AddButton } from '../../Button/AddButton';
import { selectTask } from '../../store/slices/tasks';
import { HeaderTimer } from './HeaderTimer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const notification = require('../../../audio/notification.wav');
import './timer.css';

interface ITaskProps {
  text?: string;
  id: string;
  time: number;
  count: number;
}

export function Timer() {
  const TIME_TASK = 0.1;
  const TIME_REST_SHORT = 0.15;
  const TIME_REST_LONG = '01';
  //порядковый номер успешного завершения сеанса
  const [sessionNumber, setSessionNumber] = useState(1);
  //получаем id задачи на которую сработал таймер
  const { id } = useParams();
  //вытаскиваем все задачи из store
  const tasks: ITaskProps[] = useAppSelector(selectTask);
  const task = tasks.find((item) => item.id === id);
  const numberTask = task?.id?.replace(/[^\d]/gi, '');

  //константы под секунды
  const secondsTask = Number(TIME_TASK) * 60;
  let secondsRest = Number(TIME_REST_SHORT) * 60;
  if (sessionNumber === 4) {
    secondsRest = Number(TIME_REST_LONG) * 60;
  }

  //стейт начального состояния счетчика
  const [count, setCount] = useState(secondsTask);
  //cтейт для кнопки добавления времени
  const [addMinutes, setAddMinutes] = useState(TIME_TASK);
  //стейт начального состояния задержки для таймера
  const [delay, setDelay] = useState(1000);
  //стейт начального состояния запуска таймера
  const [isRunning, setIsRunning] = useState(false);
  //проверка на состояние паузы
  const [isResume, setIsResume] = useState(false);
  //проверка на состояние активновти выполнения задачи
  const [isTaskActive, setIsTaskActive] = useState(false);
  //DOM эленты для минут и секунд
  const boxMinutes = document.querySelector('.timer__minutes');
  const boxSeconds = document.querySelector('.timer__seconds');
  //стейты для отдыха
  const [isRest, setIsRest] = useState(false);
  const [countRest, setCountRest] = useState(secondsRest);
  //хук для таймера
  useInterval(
    () => {
      !isRest
        ? countdownTimer(count, setCount)
        : countdownTimer(countRest, setCountRest);
    },
    isRunning ? delay : null
  );
  //функция счетчика
  function countdownTimer(
    count: number,
    state: React.Dispatch<React.SetStateAction<number>>
  ) {
    state(count - 1);
    //каждый тик пересчитываем минуты и секунды
    const timerMinutes = count > 0 ? Math.floor(count / 60) % 60 : 0;
    const timerSeconds = count > 0 ? Math.floor(count) % 60 : 0;
    //помещаем  их в DOM
    showTimeInDOM(boxMinutes, boxSeconds, timerMinutes, timerSeconds);
    //если время закончилось, останавливаем счетчик
    if (count <= 0) {
      pomodoroIsOver();
    }
  }
  //функция срабатывает по истечению времени
  function pomodoroIsOver() {
    stop();
    playNotification();
    longRest();
    setIsRest(!isRest);
  }
  //функция по увеличению времени на четвертый отдых
  function longRest() {
    if (isRest) setSessionNumber(sessionNumber + 1);
    if (isRest && sessionNumber === 4) {
      setSessionNumber(1);
    }
  }
  //командные функции на кнопки таймера
  function stop() {
    setCount(secondsTask);
    showTimeInDOM(boxMinutes, boxSeconds, TIME_TASK, 0);
    setIsRunning(false);
    setIsResume(false);
    setIsTaskActive(false);

    setCountRest(secondsRest);

    longRest();

    if (isRest) setIsRest(false);
  }

  function finished() {
    stop();
    setIsRest(!isRest);
    playNotification();
  }

  function start() {
    setCount(secondsTask);
    setIsRunning(true);
    setIsTaskActive(true);

    setCountRest(secondsRest);
  }

  function pause() {
    setIsRunning(false);
    setIsResume(true);
  }

  function resume() {
    setIsResume(false);
    setIsRunning(true);
  }

  return (
    <div className="timer">
      <HeaderTimer
        count={task?.count}
        task={task?.text}
        status={`${isTaskActive && !isRest ? 'run' : isRest ? 'rest' : 'stop'}`}
      />
      <div className="timer__content">
        <div className="timer__duration">
          <div className="timer__items">
            <div className="timer__item timer__minutes">
              {!isRest
                ? TIME_TASK
                : sessionNumber === 4
                ? TIME_REST_LONG
                : TIME_REST_SHORT}
            </div>
            <div className="timer__item timer__seconds">00</div>
          </div>
          {!isRunning && !isResume && (
            <AddButton
              className="active"
              onClick={() => setAddMinutes(addMinutes + 1)}
            />
          )}
          {(isRunning || isResume) && (
            <AddButton className="disabled" disabled={true} />
          )}
        </div>

        <div className="timer__task-current">
          <span>Задача {numberTask} - </span>
          {task?.text}
        </div>

        {!isRunning && !isResume && (
          <div className="timer__wrap-button">
            <Button
              onClick={start}
              className="start"
              type="button"
              variant="green"
              title="Старт"
            />
            <Button
              onClick={stop}
              className="stop"
              type="button"
              variant="gray"
              title="Стоп"
            />
          </div>
        )}
        {isRunning && !isResume && (
          <div className="timer__wrap-button">
            <Button
              onClick={pause}
              className="start"
              type="button"
              variant="green"
              title="Пауза"
            />
            <Button
              onClick={stop}
              className="stop"
              type="button"
              variant="red"
              title={`${isRest ? 'Пропустить' : 'Стоп'}`}
            />
          </div>
        )}
        {!isRunning && isResume && (
          <div className="timer__wrap-button">
            <Button
              onClick={resume}
              className="start"
              type="button"
              variant="green"
              title="Продолжить"
            />
            <Button
              onClick={finished}
              className="stop"
              type="button"
              variant="red"
              title={`${isRest ? 'Пропустить' : 'Сделано'}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Функция принимает секунды и минуты и помещает их в соответствующие DOM элементы
 * @param elementMinutes - DOM элемент под минуты
 * @param elementSeconds - DOM элемент под секунды
 * @param timeMinutes - время в минутах
 * @param timeSeconds - время в секундах
 */
function showTimeInDOM(
  elementMinutes: Element | null,
  elementSeconds: Element | null,
  timeMinutes: number | string,
  timeSeconds: number | string
) {
  setTimeFormat(elementMinutes, timeMinutes);
  setTimeFormat(elementSeconds, timeSeconds);
}
/**
 * функция преобразовывает время в нужный вид и помещает его в указанный DOM элемент
 * @param element - DOM элемент куда помещаем значение времени
 * @param time - значение времени
 */
function setTimeFormat(element: Element | null, time: number | string) {
  if (element) {
    element.textContent = String(
      Number(time) < 10 ? '0' + Number(time) : Number(time)
    );
  }
}
/**
 * функция проигрвает уведомление
 */
function playNotification() {
  const audio = new Audio(notification);
  audio.play();
}
