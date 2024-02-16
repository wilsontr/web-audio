import { useEffect, useRef, useState } from "react"

export const useAudioContext = () => {
  const audioContext = useRef<AudioContext | undefined>();
  const [audioStarted, setAudioStarted] = useState(false);
  
  useEffect(() => {
    const AudioContext =
    typeof window !== "undefined"// @ts-ignore-line
      ? window.AudioContext || window.webkitAudioContext 
      : undefined;
    if (AudioContext) {
      audioContext.current = new AudioContext();           
    }
  }, []);

  const handleAudioToggle = () => {
    if (audioStarted) {
      setAudioStarted(false);
      audioContext.current?.suspend();
    } else {
      setAudioStarted(true);
      audioContext?.current?.resume();
    }
  };


  return { audioContext: audioContext.current, handleAudioToggle, audioStarted }
}