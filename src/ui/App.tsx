import { Fragment } from 'react';

import SpeechTextField from './SpeechTextFIeld';

const App = () => {
  return (
    <Fragment>
      <h1>Hello, World!</h1>
      <SpeechTextField label="Describe what you would like this topic to do" />
    </Fragment>
  );
};

export default App;
