import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../../../Button';
import { useForm } from 'react-hook-form';
import './formtasks.css';

export function FormTasks() {
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
  } = useForm();
  const onSubmit = (data: object) => {
    console.log(data);
    //обнуляем стейт, после передачи объекта(хранилище/контекст/пропсы)
    setText('');
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
      <Button type="submit" variant="green" title="Добавить" />
    </Form>
  );
}
