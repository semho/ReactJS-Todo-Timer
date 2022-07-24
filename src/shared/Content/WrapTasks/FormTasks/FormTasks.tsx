import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../../../Button';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../hooks/hooksStore';
import { addTask, changeTask } from '../../../store/slices/tasks';
import nextId from 'react-id-generator';
import './formtasks.css';
import { useNavigate } from 'react-router-dom';

interface IFormProps {
  status?: string;
  idTask?: string;
}

interface IFormInput {
  newTask?: string;
}

export function FormTasks({ status = 'Добавить', idTask }: IFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //стейт для значение input
  const [text, setText] = useState('');
  //записываем значение в стейт при срабатывании события
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data: IFormInput) => {
    if (status === 'Добавить') {
      //сформируем новый объект с уникальным id и передадим в store
      const newData = {
        text: data.newTask,
        id: nextId(),
        time: 25,
        count: 1,
      };

      if (data) {
        dispatch(addTask(newData));
      }
    }

    //если форма на изменение задачи
    if (status === 'Сохранить' && idTask) {
      dispatch(changeTask({ id: idTask, text: data.newTask }));
      navigate('/');
    }

    //обнуляем стейт и объект, после передачи объекта(хранилище/контекст/пропсы)
    setText('');
    reset({});
  };

  return (
    <Form
      className="wrap-tasks__form-tasks form-tasks"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group className="mb-4" controlId="formBasicInput">
        <Form.Control
          value={text}
          type="text"
          className="form-tasks__input"
          placeholder="Название задачи"
          aria-invalid={errors.newTask ? 'true' : undefined}
          {...register('newTask', {
            onChange: onChangeInput,
            required: true,
            minLength: 4,
          })}
        />
        {errors.newTask && (
          <p className="form-tasks__error">Введите больше 3-х символов</p>
        )}
      </Form.Group>
      <Button type="submit" variant="green" title={status} />
    </Form>
  );
}
