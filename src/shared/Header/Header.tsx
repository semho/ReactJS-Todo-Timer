import React from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import { LogoIcon } from '../Icons/LogoIcon';
import { Icon } from '../Icons/Icon';
import { EIcons } from '../Icons/Icon';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="app__header header">
      <Container className="header__container d-flex justify-content-between">
        <div className="header__left-wrap">
          <Link to="/">
            <LogoIcon />
            <span className="header__title-logo">pomodoro_box</span>
          </Link>
        </div>
        <div className="header__right-wrap">
          <Link to="/statistics">
            <Icon name={EIcons.statistics} />
            <span className="header__link">Статистика</span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
