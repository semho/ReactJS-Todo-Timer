import React, { useEffect, useState } from 'react';
import './header.css';
import Container from 'react-bootstrap/Container';
import { LogoIcon } from '../Icons/LogoIcon';
import { Icon, EIcons } from '../Icons/Icon';
import { Link } from 'react-router-dom';

import { useTheme } from './../../hooks/useTheme';
import { Button } from '../Button';
import { SettingsIcon } from '../Icons/SettingsIcon';

export function Header() {
  const { theme, setTheme } = useTheme();

  const [isLightTheme, setisLightTheme] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      setisLightTheme(true);
    } else {
      setisLightTheme(false);
    }
  }, [theme]);

  const handleLightThemeClick = () => {
    setTheme('light');
  };
  const handleDarkThemeClick = () => {
    setTheme('dark');
  };

  return (
    <header className="app__header header">
      <Container className="header__container d-flex justify-content-between">
        <div className="header__left-wrap">
          <Link to="/" className="header__link-wrap">
            <LogoIcon />
            <span className="header__title-logo">pomodoro_box</span>
          </Link>
        </div>
        <div className="header__right-wrap">
          <div className="header__right-group-btn">
            {!isLightTheme && (
              <Button
                variant="red"
                type="button"
                title="Light"
                className="btn-theme"
                onClick={handleLightThemeClick}
              />
            )}
            {isLightTheme && (
              <Button
                variant="red"
                type="button"
                title="Dark"
                className="btn-theme"
                onClick={handleDarkThemeClick}
              />
            )}
          </div>

          <Link to="/statistics" className="header__link-wrap">
            <Icon name={EIcons.statistics} />
            <span className="header__link">Статистика</span>
          </Link>
          <Link to="/settings" className="header__link-wrap">
            <SettingsIcon className="header__svg-setting" />
            <span className="header__link">Настройки</span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
