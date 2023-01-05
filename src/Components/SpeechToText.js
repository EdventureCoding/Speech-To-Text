import React, { useEffect, useState } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;

    recognition.onresult = (event) => {
      const result = event.results[0][0];
      setTranscript(result.transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
    };
  }, [isRecording]);

  return (
    <div className='MainContainer'>
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? 'Stop' : 'Start'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
