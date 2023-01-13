import { ActionButton, TextField } from '@fluentui/react';
import { useCallback, useEffect, useState } from 'react';

import type { IIconProps, ITextFieldProps } from '@fluentui/react';

const microphoneIconProps: IIconProps = { iconName: 'Microphone' };

const SpeechTextField = (props: ITextFieldProps) => {
  const [dictating, setDictating] = useState(false);
  const [dictateReason, setDictateReason] = useState('');
  const [interims, setInterims] = useState('');
  const [value, setValue] = useState('');

  const handleMicrophoneClick = useCallback(() => {
    setDictating(dictating => !dictating);
  }, [setDictating]);

  useEffect(() => {
    if (!dictating) {
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;

    setDictateReason('Readying…');
    setInterims('');
    setValue('');

    // @ts-ignore
    const speech = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    speech.lang = 'en';
    speech.interimResults = true;

    speech.start();

    abortController.signal.addEventListener(
      'abort',
      () => {
        speech.abort();
      },
      { once: true }
    );

    speech.addEventListener('audiostart', () => {
      signal.aborted || setDictateReason('Listening…');
    });

    speech.addEventListener(
      'end',
      () => {
        setDictating(false);
      },
      { once: true }
    );

    speech.addEventListener('result', ({ results }: { results: any }) => {
      const [result] = results;

      setInterims(result[0].transcript);
      setValue(result[0].transcript);

      if (result.isFinal) {
        setDictateReason('');
        setInterims('');
        setValue(result[0].transcript);
      }
    });

    speech.addEventListener(
      'error',
      ({ message }: { message: string }) => signal.aborted || setDictateReason(message),
      { once: true }
    );

    return abortController.abort.bind(abortController);
  }, [dictating]);

  const handleChange = useCallback((_, value) => !dictating && setValue(value), [dictating, setValue]);

  const handleRenderSuffix = useCallback(() => {
    return <ActionButton iconProps={microphoneIconProps} onClick={handleMicrophoneClick} />;
  }, []);

  return (
    <div>
      <TextField
        {...props}
        // disabled={dictating && !interims}
        multiline={true}
        placeholder={interims || dictateReason}
        readOnly={dictating}
        required={true}
        onChange={handleChange}
        onRenderSuffix={handleRenderSuffix}
        value={value}
      />
    </div>
  );
};

export default SpeechTextField;
