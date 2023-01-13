import React, { useCallback, useRef, useState } from 'react';

import withSpeech from './withSpeech';

const InternalTextAreaWithSpeech = withSpeech<{
  placeholder?: string;
  readOnly?: boolean;
}>('textarea');

const TextAreaWithSpeech = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const [dictating, setDictating] = useState(false);
  const onChangeRef = useRef<typeof props['onChange']>();

  onChangeRef.current = props.onChange;

  const handleMicrophoneClick = useCallback(() => setDictating(dictating => !dictating), [setDictating]);
  const handleRecognized = useCallback(
    (_: Event, value: string) => {
      setDictating(false);
      onChangeRef.current?.({ target: { value } } as any);
    },
    [onChangeRef, setDictating]
  );

  return (
    <div>
      <InternalTextAreaWithSpeech {...props} dictating={dictating} onRecognized={handleRecognized} />
      <button onClick={handleMicrophoneClick} type="button">
        {dictating ? 'Stop speak' : 'Speak'}
      </button>
    </div>
  );
};

export default TextAreaWithSpeech;
