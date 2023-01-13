import { ActionButton, TextField } from '@fluentui/react';
import React, { useCallback, useRef, useState } from 'react';

import withSpeech from './withSpeech';

import type { IIconProps, ITextFieldProps } from '@fluentui/react';

const MICROPHONE_ICON_PROPS: IIconProps = { iconName: 'Microphone' };
const SPEECH_ICON_PROPS: IIconProps = { iconName: 'CircleStop' };

const InternalFluentTextFieldWithSpeech = withSpeech<ITextFieldProps>(TextField);

const FluentTextFieldWithSpeech = (props: ITextFieldProps) => {
  const [dictating, setDictating] = useState(false);
  const onChangeRef = useRef<typeof props['onChange']>();

  onChangeRef.current = props.onChange;

  const handleMicrophoneClick = useCallback(() => setDictating(dictating => !dictating), [setDictating]);
  const handleRecognized = useCallback(
    (event, value) => {
      onChangeRef.current?.(event, value);
      setDictating(false);
    },
    [onChangeRef, setDictating]
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
      onRecognized={handleRecognized}
      onRenderSuffix={handleRenderSuffix}
    />
  );
};

export default FluentTextFieldWithSpeech;
