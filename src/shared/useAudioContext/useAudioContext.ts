import { useEffect, useRef } from "react"

export const useAudioContext = () => {
  const audioContext = useRef<AudioContext | undefined>();
  useEffect(() => {
    const AudioContext =
    typeof window !== "undefined"// @ts-ignore-line
      ? window.AudioContext || window.webkitAudioContext 
      : undefined;
    if (AudioContext) {
      audioContext.current = new AudioContext();           
    }
  }, []);

  return audioContext.current;
}