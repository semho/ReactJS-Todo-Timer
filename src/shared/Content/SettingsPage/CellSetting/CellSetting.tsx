import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooksStore';
import { Button } from '../../../Button';
import {
  ChangeSettingState,
  changeTimeSettings,
  selectSettings,
} from '../../../store/slices/settings';
import './cellsetting.css';

interface ICellProps {
  title: string;
  idInput: string;
  type?: string;
  position?: boolean;
}

export function CellSetting({
  title,
  idInput,
  type = 'number',
  position = false,
}: ICellProps) {
  const dispatch = useAppDispatch();
  const settings: ChangeSettingState[] = useAppSelector(selectSettings);
  const currentSetting = settings.find((item) => item.id === idInput);
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
  const onSubmit = (data: { valueMinutes?: number | string }) => {
    console.log(data);

    if (data.valueMinutes) {
      dispatch(changeTimeSettings({ id: idInput, time: data.valueMinutes }));
    }
  };

  return (
    <>
      <div className="cell__wrap-title">
        <span className="cell__settings-title">{title}</span>
        <span>
          {currentSetting?.time} {`${position ? 'позиция' : 'мин'}`}
        </span>
      </div>
      <Form className="cell__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          value={text}
          placeholder={`${position ? 'номер позиции' : 'в минутах'}`}
          type={type}
          id={idInput}
          className="form-control"
          aria-invalid={errors.valueMinutes ? 'true' : undefined}
          {...register('valueMinutes', {
            onChange: onChangeInput,
            required: true,
            minLength: 1,
            valueAsNumber: true,
            validate: (value) => value > 0,
          })}
        />
        {errors.valueMinutes && (
          <p className="form-tasks__error">Введите число больше 0</p>
        )}
        <Button type="submit" variant="green" title="Изменить" />
      </Form>
    </>
  );
}
