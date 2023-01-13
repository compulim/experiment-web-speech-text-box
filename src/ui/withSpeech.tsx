import React, { useEffect, useRef, useState } from 'react';

import type { ComponentClass, FunctionComponent } from 'react';

type InnerProps = {
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
};

type Props = {
  dictating: boolean;
  onRecognized: (value: string) => void;
};

export default function withSpeech<P extends InnerProps>(
  componentClass: ComponentClass<P> | FunctionComponent<P> | string
) {
  return ({ dictating, onRecognized, ...props }: P & Props) => {
    const [dictateReason, setDictateReason] = useState('');
    const [interims, setInterims] = useState('');

    const interimsRef = useRef<string>();
    const onRecognizedRef = useRef<typeof onRecognized>();

    interimsRef.current = interims;
    onRecognizedRef.current = onRecognized;

    useEffect(() => {
      if (!dictating) {
        return;
      }

      const abortController = new AbortController();
      const { signal } = abortController;

      setDictateReason('Readying…');
      setInterims('');

      // @ts-ignore
      const speech = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      speech.lang = 'en';
      speech.interimResults = true;

      speech.start();

      abortController.signal.addEventListener('abort', () => speech.abort(), { once: true });

      speech.addEventListener('audiostart', () => signal.aborted || setDictateReason('Listening…'));

      speech.addEventListener(
        'end',
        () => {
          onRecognizedRef.current?.(interimsRef.current || '');
          setDictateReason('');
        },
        { once: true }
      );

      speech.addEventListener('result', ({ results }: { results: any }) => {
        const [result] = results;

        setInterims(result[0].transcript);

        if (result.isFinal) {
          setDictateReason('');
        }
      });

      speech.addEventListener(
        'error',
        ({ message }: { message: string }) => signal.aborted || setDictateReason(message),
        { once: true }
      );

      return abortController.abort.bind(abortController);
    }, [dictating, interimsRef, onRecognized, setDictateReason, setInterims]);

    const nextProps: InnerProps & P = {
      ...props,
      placeholder: dictateReason || props.placeholder,
      readOnly: dictating || props.readOnly,
      value: dictating ? interims : props.value
    } as any;

    return React.createElement(componentClass, nextProps);
  };
}
