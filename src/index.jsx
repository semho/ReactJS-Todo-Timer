import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './shared/App/App';
// import reportWebVitals from './library/reportWebVitals'
import registerServiceWorker from 'react-service-worker';
// import { AppContainer } from 'react-hot-loader';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './shared/Content/MainPage';
import { StatisticsPage } from './shared/Content/StatisticsPage';

//для 18 версии react инициализация приложения поменялась
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

//вставляем элемент в DOM для портала
const div = document.createElement('div');
div.setAttribute('id', 'dropdown_root');
document.body.appendChild(div);

const render = (Component) => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Component />}>
            <Route path="/" element={<MainPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

registerServiceWorker();

render(App);
