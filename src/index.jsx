import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './shared/App/App';
// import reportWebVitals from './library/reportWebVitals'
import registerServiceWorker from 'react-service-worker';
// import { AppContainer } from 'react-hot-loader';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//для 18 версии react инициализация приложения поменялась
const rootElement =
document.getElementById('root');
const root =
createRoot(rootElement);

const render = (Component) => {
  root.render(
    <StrictMode>
      <Component />
    </StrictMode>
  );
};

registerServiceWorker();

render(App);


