import { render } from 'react-dom';

import App from './ui/App';

const rootElement = document.getElementById('root');

rootElement && render(<App />, rootElement);
