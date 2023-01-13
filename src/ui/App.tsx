import { Icon } from '@fluentui/react';
import { Fragment, useCallback, useState } from 'react';

import FluentTextFieldWithSpeech from './FluentTextFieldWithSpeech';
import TextAreaWithSpeech from './TextAreaWithSpeech';

const App = () => {
  const [value, setValue] = useState('');

  const handleFluentChange = useCallback(
    (_, value) => {
      console.log('handleFluentChange', { value });
      setValue(value);
    },
    [setValue]
  );

  const handleHTMLChange = useCallback(
    ({ target: { value } }) => {
      setValue(value);
    },
    [setValue]
  );

  const handleRenderPrefix = useCallback(() => <Icon iconName="AddFriend" />, []);

  return (
    <Fragment>
      <h1>Hello, World!</h1>
      <FluentTextFieldWithSpeech
        label="Describe what you would like this topic to do"
        onChange={handleFluentChange}
        onRenderPrefix={handleRenderPrefix}
        value={value}
      />
      <TextAreaWithSpeech onChange={handleHTMLChange} value={value} />
    </Fragment>
  );
};

export default App;
