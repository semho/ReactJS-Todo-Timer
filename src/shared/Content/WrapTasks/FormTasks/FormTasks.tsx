import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './formtasks.css';

export function FormTasks() {
  return (
    <Form className='wrap-tasks__form-tasks form-tasks'>
      <Form.Group className="mb-4" controlId="formBasicInput">
        <Form.Control type="text" className='form-tasks__input' placeholder="Название задачи" />
      </Form.Group>
      <Button variant="success" className='form-tasks__button' type="submit">
        Добавить
      </Button>
    </Form>
  );
}
