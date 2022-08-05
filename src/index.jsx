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
import { Provider } from 'react-redux';
import { store } from './shared/store/store';
import { MainAndModal } from './shared/Content/MainAndModal';
import { Timer } from './shared/Content/Timer';
import { SettingsPage } from './shared/Content/SettingsPage';

//для 18 версии react инициализация приложения поменялась
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

//вставляем элемент в DOM для портала
const div = document.createElement('div');
const modal = document.createElement('div');
div.setAttribute('id', 'dropdown_root');
modal.setAttribute('id', 'modal_root');
document.body.appendChild(div);
document.body.appendChild(modal);

const render = (Component) => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Component />}>
              <Route path="/" element={<MainPage />}>
                <Route path="/timer/:id" element={<Timer />} />
              </Route>
              <Route path="/tasks/:id" element={<MainAndModal />} />
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <h4>Ошибка 404: Страница не найдена!</h4>
                  </main>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

registerServiceWorker();

render(App);
