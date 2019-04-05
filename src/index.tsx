import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// STORES
import { AppStore } from './stores/AppStore';
import { PokemonItemStore } from './stores/PokemonItemStore';

// STYLES
import './styles/styles.scss';

// MOBX
import { Provider } from 'mobx-react';

const stores = {
  appStore: new AppStore(),
  pokemonItemStore: new PokemonItemStore()
};

ReactDOM.render(
  (
    <Provider {...stores}>
      <App />
    </Provider>
  ),
  document.querySelector('#root'),
);

// enable react hot loader

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;

    ReactDOM.render(
      (
        <Provider {...stores}>
          <NextApp />
        </Provider>
      ),
      document.querySelector('#root'),
    );
  });
}
