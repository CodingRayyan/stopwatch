import { useState, useEffect, useRef, useCallback } from 'react';

export interface LapTime {
  id: string;
  lapNumber: number;
  lapTime: number;
  totalTime: number;
}

export function useStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<LapTime[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastLapTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lastLapTimeRef.current = 0;
  }, []);

  const recordLap = useCallback(() => {
    if (isRunning || time > 0) {
      const lapTime = time - lastLapTimeRef.current;
      const newLap: LapTime = {
        id: `lap-${Date.now()}`,
        lapNumber: laps.length + 1,
        lapTime,
        totalTime: time,
      };
      setLaps(prev => [newLap, ...prev]);
      lastLapTimeRef.current = time;
    }
  }, [time, isRunning, laps.length]);

  return {
    time,
    isRunning,
    laps,
    start,
    stop,
    reset,
    recordLap,
  };
}

export function useCountdownTimer(initialSeconds: number = 60) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 10) {
            return Math.max(0, prev - 10);
          }
          return prev - 10;
        });
      }, 10);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      playNotification();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsFinished(false);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((seconds: number = initialSeconds) => {
    setIsRunning(false);
    setTimeLeft(seconds);
    setIsFinished(false);
  }, [initialSeconds]);

  const setCustomTime = useCallback((seconds: number) => {
    setTimeLeft(Math.max(0, seconds));
    setIsFinished(false);
  }, []);

  return {
    timeLeft,
    isRunning,
    isFinished,
    start,
    stop,
    reset,
    setCustomTime,
  };
}

export function useIntervalTimer(workSeconds: number = 30, restSeconds: number = 10, cycles: number = 1) {
  const [timeLeft, setTimeLeft] = useState(workSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 10));
      }, 10);
    } else if (timeLeft === 0 && isRunning) {
      if (isWorkPhase) {
        setIsWorkPhase(false);
        setTimeLeft(restSeconds);
        playNotification();
      } else {
        if (currentCycle < cycles) {
          setCurrentCycle(prev => prev + 1);
          setIsWorkPhase(true);
          setTimeLeft(workSeconds);
          playNotification();
        } else {
          setIsRunning(false);
          setIsFinished(true);
          playNotification();
        }
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, isWorkPhase, currentCycle, cycles, workSeconds, restSeconds]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(workSeconds);
    setCurrentCycle(1);
    setIsWorkPhase(true);
    setIsFinished(false);
  }, [workSeconds]);

  return {
    timeLeft,
    isRunning,
    isFinished,
    currentCycle,
    isWorkPhase,
    start,
    stop,
    reset,
  };
}

function playNotification() {
  // Use Web Audio API for a simple beep
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

