import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooksStore';
import { useInterval } from '../../../hooks/useInterval';
import { Button } from '../../Button';
import { AddButton } from '../../Button/AddButton';
import { addDayStatistics } from '../../store/slices/statistics';
import { removeTask, selectTask } from '../../store/slices/tasks';
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
  const TIME_TASK = 25;
  const TIME_REST_SHORT = 5;
  const TIME_REST_LONG = 30;
  //подключаем store
  const dispatch = useAppDispatch();

  //порядковый номер успешного завершения сеанса
  const [sessionNumber, setSessionNumber] = useState(1);
  //счетчик для помидор
  const [tomatoNumber, setTomatoNumber] = useState(1);
  //получаем id задачи на которую сработал таймер
  const { id } = useParams();
  //вытаскиваем все задачи из store
  const tasks: ITaskProps[] = useAppSelector(selectTask);
  const task = tasks.find((item) => item.id === id);
  const numberTask = task?.id?.replace(/[^\d]/gi, '');
  const navigate = useNavigate();

  //стейт статуса отдыха
  const [isRest, setIsRest] = useState(false);
  //пременная для хранения текущего времени таймера
  let timeForTimer = Number(TIME_TASK);
  //если это отдых, перезапишем переменную
  if (isRest && sessionNumber === 4) {
    timeForTimer = Number(TIME_REST_LONG);
  } else if (isRest) {
    timeForTimer = Number(TIME_REST_SHORT);
  }
  //стейт определяет добавляем ли мы дополнительные минуты
  const [isAddMinutes, setIsAddMinutes] = useState(false);
  //стейт для перезаписи времени таймера, если были добавлены минуты
  const [customTime, setCustomTime] = useState(timeForTimer);
  //стейт для вывода сообщения, что помидоры у задачи закончились
  const [isShowFinishedTask, setIsShowFinishedTask] = useState(false);
  //переменная под секунды
  let secondsTimer = 0;

  //в хуке перезаписываем время таймера, если добавили минуты
  useEffect(() => {
    if (!isAddMinutes) setCustomTime(timeForTimer);
    secondsTimer = Number(customTime) * 60;
    //если задачи нет(пытаются задать ее через url) и при этом она не считается завершенной
    if (typeof task !== 'object' && !isShowFinishedTask) {
      //перенаправим на форму создания новой задачи
      navigate('/');
    }
  }, [addMinutes]);

  //функция для добавления минут
  function addMinutes() {
    setIsAddMinutes(true);
    setCustomTime(customTime + 1);
  }

  //стейт начального состояния счетчика
  const [count, setCount] = useState(secondsTimer);
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

  //стейт счетчика паузы
  const [countPause, setCountPause] = useState(0);
  //флаг завершения счетчика задачи или нажатия кнопки сделано
  let isOver = false;

  //хук для таймера
  useInterval(
    () => {
      countdownTimer(count, setCount);
    },
    isRunning ? delay : null
  );
  //таймер для паузы
  useInterval(
    () => {
      setCountPause(countPause + 1);
    },
    isResume ? delay : null
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
  //функция срабатывает по истечению времени или нажатию кнопки пропустить
  function pomodoroIsOver() {
    isOver = true;
    //добавим в store одну помидорку
    if (!isRest && typeof task === 'object') {
      saveInStore(0, 0, 1, 0);
    }
    //если число помидор из задачи совпало с числом выполненых помидор
    if (task?.count === tomatoNumber) {
      //показываем уведомление
      setIsShowFinishedTask(true);
      //удаляем задачу из списка задач
      if (id) {
        dispatch(removeTask(id));
      }
      setTomatoNumber(1);
      //убираем блокирующие стили
      document
        .querySelector('.container__timer')
        ?.classList.remove('add-background');
    }

    stop();
    playNotification();
    setIsRest(!isRest);
  }
  //функция по увеличению времени на четвертый отдых
  function longRest() {
    if (isRest) setSessionNumber(sessionNumber + 1);
    if (isRest && sessionNumber === 4) {
      setSessionNumber(1);
    }
  }
  /**
   * функция сохраняет объект в хранилище статистики
   * @param timeWork - время работы над задачами
   * @param timePause - общее время на паузе
   * @param countTomato - количество завершенных помидор
   * @param countStop - количество нажатий на кнопку стоп
   */
  function saveInStore(
    timeWork: number,
    timePause: number,
    countTomato: number,
    countStop: number
  ) {
    dispatch(
      addDayStatistics({
        id: getDateForId(),
        allTimeSpentWork: timeWork,
        amountTimeSpentPause: timePause,
        countFinishedTomato: countTomato,
        countStop: countStop,
      })
    );
  }

  //командные функции на кнопки таймера
  function stop() {
    //запишем в store время на паузе
    if (typeof task === 'object') saveInStore(0, countPause, 0, 0);
    //потраченное рабочее время
    const timeWork = secondsTimer - count;
    //запишем в store рабочее время
    if (!isRest && typeof task === 'object') {
      saveInStore(timeWork, 0, 0, 0);
    }

    if (!isOver && !isRest && typeof task === 'object') {
      //запишем в store нажатие на кнопку stop
      saveInStore(0, 0, 0, 1);

      document
        .querySelector('.container__timer')
        ?.classList.remove('add-background');
    }
    isOver = false;

    //увеличиваем помидорку на единицу
    if (isRest) setTomatoNumber(tomatoNumber + 1);

    setIsAddMinutes(false);
    setCustomTime(timeForTimer);
    setCount(secondsTimer);
    showTimeInDOM(boxMinutes, boxSeconds, TIME_TASK, 0);
    setIsRunning(false);
    setIsResume(false);
    setCountPause(0);
    setIsTaskActive(false);

    longRest();

    if (isRest) setIsRest(false);
  }

  function start() {
    setCount(secondsTimer);
    setIsRunning(true);
    setIsTaskActive(true);
    //вешаем блокирующий стиль на окружение таймера, пока он работает
    document
      .querySelector('.container__timer')
      ?.classList.add('add-background');
  }

  function pause() {
    setIsRunning(false);
    setIsResume(true);
  }

  function resume() {
    //запишем в store время на паузе
    if (typeof task === 'object') saveInStore(0, countPause, 0, 0);
    setIsResume(false);
    setCountPause(0);
    setIsRunning(true);
  }

  return (
    <div className="timer">
      <HeaderTimer
        count={tomatoNumber}
        task={task?.text}
        status={`${isTaskActive && !isRest ? 'run' : isRest ? 'rest' : 'stop'}`}
      />
      <div className="timer__content">
        <div className="timer__duration">
          <div className="timer__items">
            <div className="timer__item timer__minutes">
              {getFormatTime(customTime)}
            </div>
            <div className="timer__item timer__seconds">00</div>
          </div>
          {!isRunning && !isResume && (
            <AddButton className="active" onClick={addMinutes} />
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
              disabled={true}
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
              onClick={pomodoroIsOver}
              className="stop"
              type="button"
              variant="red"
              title={`${isRest ? 'Пропустить' : 'Сделано'}`}
            />
          </div>
        )}
      </div>
      {isShowFinishedTask && (
        <div className="timer__wrap-message">
          <div className="timer__message message">
            <h4 className="message__title">Задача завершилась</h4>
            <p>
              Чтобы создать новую задачу или выбрать уже созданную, перейдите на
              главную страницу
            </p>
            <Link className="messge__link" to="/">
              <Button variant="green" type="button" title={'Перейти'} />
            </Link>
          </div>
        </div>
      )}
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
    element.textContent = getFormatTime(time);
  }
}
/**
 * функция проигрвает уведомление
 */
function playNotification() {
  const audio = new Audio(notification);
  audio.play();
}
/**
 * функция преобразует число в строку и добаляет знак 0 перечед числом, если число меньше 10
 * @param time - принимает число или строку содержащую число
 * @returns - возвращает преобразованную строку
 */
function getFormatTime(time: number | string): string {
  return String(Number(time) < 10 ? '0' + Number(time) : Number(time));
}
/**
 * функция даты в формате(Год-номерМесяца-деньМесяца)
 * @returns - возвращаем строку
 */
function getDateForId(): string {
  const today = new Date();

  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}
