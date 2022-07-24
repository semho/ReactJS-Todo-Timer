import './App.css';
import '../../main.global.css';
import React, { useEffect } from 'react';
import { Layout } from '../Layout';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import { Header } from '../Header/Header';
import { Content } from '../Content/Content';
import { Outlet, Route } from 'react-router-dom';
//отключить перезагрузку хуков в hot-loader
// setConfig({
//   reloadHooks: false,
// });
//отключаем предупреждения hot-loader о том, что он хочет свой пакет вместо стандартного react-dom
setConfig({
  showReactDomPatchNotification: false,
});

const App = () => {
  useEffect(() => {
    document.title = 'pomodoro_box';
  }, []);

  return (
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

// export default process.env.NODE_ENV === 'development' ? hot(App) : App;
export default App;
