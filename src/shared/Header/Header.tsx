import React from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import { LogoIcon } from '../Icons/LogoIcon';
import { Icon } from '../Icons/Icon';
import { EIcons } from '../Icons/Icon';

export function Header() {
  return (
    <header className="app__header header">
      <Container className="header__container d-flex justify-content-between">
        <div className="header__left-wrap">
          <LogoIcon />
          <span className="header__title-logo">pomodoro_box</span>
        </div>
        <div className="header__right-wrap">
          <Icon name={EIcons.statistics} />
          <span className="header__link">Статистика</span>
        </div>
      </Container>
    </header>
  );
}
