import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooksStore';
import { Button } from '../Button';
import { FormTasks } from '../Content/WrapTasks/FormTasks';
import { EIcons, Icon } from '../Icons/Icon';
import { removeTask } from '../store/slices/tasks';
import './modal.css';

export function Modal() {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  //получаем id текущей задачи
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const method = searchParams.get('method');
  const [showField, setShowField] = useState(false);

  let title = 'Удалить';
  if (method === 'put') title = 'Изменить';

  function changeTask() {
    if (!id) return;
    if (title === 'Удалить') {
      //удаляем задачу из store
      dispatch(removeTask(id));
      //возвращаемся в MainPage
      navigate('/');
    }
    if (title === 'Изменить') {
      //показываем поле ввода
      setShowField(true);
    }
  }

  const node = document.getElementById('modal_root');
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className="modal-fade" ref={ref}>
      <div className="modal-task">
        <div className="modal-task__content">
          <div className="modal-task__close">
            <Link to="/">
              <Icon name={EIcons.close} size={24} color="#C4C4C4" />
            </Link>
          </div>
          <h4 className="modal-task__title">{title} задачу?</h4>
          {!showField && (
            <div onClick={changeTask}>
              <Button variant="red" type="button" title={title} />
            </div>
          )}
          {showField && <FormTasks status="Сохранить" idTask={id} />}
          <Link className="modal-task__link" to="/">
            Отмена
          </Link>
        </div>
      </div>
    </div>,
    node
  );
}
