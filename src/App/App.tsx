import './App.css';
import '../main.global.css';
import React from 'react';
import { Layout } from '../Layout';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader'
//отключить перезагрузку хуков в hot-loader
// setConfig({
//   reloadHooks: false,
// });
//отключаем предупреждения hot-loader о том, что он хочет свой пакет вместо стандартного react-dom
setConfig({
  showReactDomPatchNotification: false
})

const App = () => {

  return (
    <Layout>
      <header>Header</header>
      <section>Content</section>
    </Layout>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
