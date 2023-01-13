import React, { useCallback, useState } from 'react';

import withSpeech from './withSpeech';

import type { ChangeEventHandler } from 'react';

const InternalTextAreaWithSpeech = withSpeech<{
  placeholder?: string;
  readOnly?: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
}>('textarea');

const TextAreaWithSpeech = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const [dictating, setDictating] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => setValue(value),
    [setValue]
  );
  const handleMicrophoneClick = useCallback(() => setDictating(dictating => !dictating), [setDictating]);
  const handleRecognized = useCallback(
    value => {
      setDictating(false);
      setValue(value);
    },
    [setDictating, setValue]
  );

  return (
    <div>
      <InternalTextAreaWithSpeech
        {...props}
        dictating={dictating}
        onChange={handleChange}
        onRecognized={handleRecognized}
        value={value}
      />
      <button onClick={handleMicrophoneClick} type="button">
        {dictating ? 'Stop speak' : 'Speak'}
      </button>
    </div>
  );
};

export default TextAreaWithSpeech;
