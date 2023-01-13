import { Icon } from '@fluentui/react';
import { Fragment, useCallback, useState } from 'react';

import FluentTextFieldWithSpeech from './FluentTextFieldWithSpeech';
import TextAreaWithSpeech from './TextAreaWithSpeech';

const App = () => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (_, value) => {
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
        onChange={handleChange}
        onRenderPrefix={handleRenderPrefix}
        value={value}
      />
      <TextAreaWithSpeech />
    </Fragment>
  );
};

export default App;
