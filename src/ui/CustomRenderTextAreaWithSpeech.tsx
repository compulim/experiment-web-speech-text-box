import React, { useCallback, useRef, useState } from 'react';

import withSpeech from './withSpeech';

const InternalTextAreaWithSpeech = withSpeech<{
  placeholder?: string;
  readOnly?: boolean;
}>('textarea');

const CustomRenderTextAreaWithSpeech = ({
  containerClassName,
  onRenderMicrophoneButton,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  containerClassName?: string;
  onRenderMicrophoneButton?: (props: { dictating: boolean; onClick: () => void }) => JSX.Element;
}) => {
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
      {onRenderMicrophoneButton?.({ dictating, onClick: handleMicrophoneClick })}
    </div>
  );
};

export default CustomRenderTextAreaWithSpeech;
