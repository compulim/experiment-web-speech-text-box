import { ActionButton, TextField } from '@fluentui/react';
import React, { useCallback, useState } from 'react';

import withSpeech from './withSpeech';

import type { IIconProps, ITextFieldProps } from '@fluentui/react';

const MICROPHONE_ICON_PROPS: IIconProps = { iconName: 'Microphone' };
const SPEECH_ICON_PROPS: IIconProps = { iconName: 'CircleStop' };

const InternalFluentTextFieldWithSpeech = withSpeech<ITextFieldProps>(TextField);

const FluentTextFieldWithSpeech = (props: ITextFieldProps) => {
  const [dictating, setDictating] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = useCallback((_, value) => setValue(value), [setValue]);
  const handleMicrophoneClick = useCallback(() => setDictating(dictating => !dictating), [setDictating]);
  const handleRecognized = useCallback(
    value => {
      setDictating(false);
      setValue(value);
    },
    [setDictating, setValue]
  );

  const handleRenderSuffix = useCallback(
    () => (
      <ActionButton iconProps={dictating ? SPEECH_ICON_PROPS : MICROPHONE_ICON_PROPS} onClick={handleMicrophoneClick} />
    ),
    [dictating, handleMicrophoneClick]
  );

  return (
    <InternalFluentTextFieldWithSpeech
      {...props}
      dictating={dictating}
      onChange={handleChange as any}
      onRecognized={handleRecognized}
      onRenderSuffix={handleRenderSuffix}
      value={value}
    />
  );
};

export default FluentTextFieldWithSpeech;
