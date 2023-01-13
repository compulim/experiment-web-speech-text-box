import { ActionButton, Icon } from '@fluentui/react';
import { Fragment, useCallback, useState } from 'react';
import CustomRenderTextAreaWithSpeech from './CustomRenderTextAreaWithSpeech';

import FluentTextFieldWithSpeech from './FluentTextFieldWithSpeech';
import TextAreaWithSpeech from './TextAreaWithSpeech';

import type { IIconProps } from '@fluentui/react';

const DICTATING_ICON_PROPS: IIconProps = { iconName: 'CircleStop' };
const MICROPHONE_ICON_PROPS: IIconProps = { iconName: 'Microphone' };

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

  const handleRenderMicrophoneButton = useCallback(
    ({ dictating, onClick }) => (
      <ActionButton iconProps={dictating ? DICTATING_ICON_PROPS : MICROPHONE_ICON_PROPS} onClick={onClick} />
    ),
    []
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
      <CustomRenderTextAreaWithSpeech
        onChange={handleHTMLChange}
        onRenderMicrophoneButton={handleRenderMicrophoneButton}
        value={value}
      />
    </Fragment>
  );
};

export default App;
