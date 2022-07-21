import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../../../Button';
import './formtasks.css';

export function FormTasks() {
  return (
    <Form className="wrap-tasks__form-tasks form-tasks">
      <Form.Group className="mb-4" controlId="formBasicInput">
        <Form.Control
          type="text"
          className="form-tasks__input"
          placeholder="Название задачи"
        />
      </Form.Group>
      <Button type="submit" variant="green" title="Добавить" />
    </Form>
  );
}
