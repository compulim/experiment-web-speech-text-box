import { render } from 'react-dom';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

import App from './ui/App';

initializeIcons();

const rootElement = document.getElementById('root');

rootElement && render(<App />, rootElement);
