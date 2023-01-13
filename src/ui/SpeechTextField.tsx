// import { ActionButton, TextField } from '@fluentui/react';
// import React, { useCallback, useEffect, useRef, useState } from 'react';

// import type { IIconProps, ITextFieldProps } from '@fluentui/react';

// const MICROPHONE_ICON_PROPS: IIconProps = { iconName: 'Microphone' };
// const SPEECH_ICON_PROPS: IIconProps = { iconName: 'CircleStop' };

// const SpeechTextField = (props: ITextFieldProps) => {
//   const [dictating, setDictating] = useState(false);
//   const [dictateReason, setDictateReason] = useState('');

//   const onChangeRef = useRef<typeof props.onChange>();

//   onChangeRef.current = props.onChange;

//   const handleMicrophoneClick = useCallback(() => {
//     setDictating(dictating => !dictating);
//   }, [setDictating]);

//   useEffect(() => {
//     if (!dictating) {
//       return;
//     }

//     const abortController = new AbortController();
//     const { signal } = abortController;

//     setDictateReason('Readying…');
//     onChangeRef.current?.(undefined as any, '');

//     // @ts-ignore
//     const speech = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

//     speech.lang = 'en';
//     speech.interimResults = true;

//     speech.start();

//     abortController.signal.addEventListener(
//       'abort',
//       () => {
//         speech.abort();
//       },
//       { once: true }
//     );

//     speech.addEventListener('audiostart', () => {
//       signal.aborted || setDictateReason('Listening…');
//     });

//     speech.addEventListener(
//       'end',
//       () => {
//         setDictating(false);
//         setDictateReason('');
//       },
//       { once: true }
//     );

//     speech.addEventListener('result', ({ results }: { results: any }) => {
//       const [result] = results;

//       onChangeRef.current?.(undefined as any, result[0].transcript);

//       if (result.isFinal) {
//         setDictateReason('');
//       }
//     });

//     speech.addEventListener(
//       'error',
//       ({ message }: { message: string }) => signal.aborted || setDictateReason(message),
//       { once: true }
//     );

//     return abortController.abort.bind(abortController);
//   }, [dictating]);

//   const handleChange = useCallback(
//     (_, value) => {
//       !dictating && onChangeRef.current?.(_, value);
//     },
//     [dictating, onChangeRef]
//   );

//   const handleRenderSuffix = useCallback(() => {
//     return (
//       <ActionButton iconProps={dictating ? SPEECH_ICON_PROPS : MICROPHONE_ICON_PROPS} onClick={handleMicrophoneClick} />
//     );
//   }, [dictating]);

//   return (
//     <div>
//       <TextField
//         {...props}
//         placeholder={dictateReason || props.placeholder}
//         readOnly={dictating || props.readOnly}
//         onChange={handleChange}
//         onRenderSuffix={handleRenderSuffix}
//       />
//     </div>
//   );
// };

// export default SpeechTextField;
