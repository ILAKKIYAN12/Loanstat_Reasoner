import { useEffect, useRef } from 'react';

export default function KioskController({
  isKioskActive,
  setIsKioskActive,
  onAutoPlayCycle
}) {
  const idleTimerRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);

  const resetIdleTimer = () => {
    if (isKioskActive) {
      setIsKioskActive(false);
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    }

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // 20 Seconds Idle Threshold
    idleTimerRef.current = setTimeout(() => {
      setIsKioskActive(true);
    }, 20000);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'touchstart', 'pointerdown', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, resetIdleTimer));

    resetIdleTimer();

    return () => {
      events.forEach(evt => window.removeEventListener(evt, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, [isKioskActive]);

  useEffect(() => {
    if (isKioskActive) {
      // Execute continuous showcase cycle every 8 seconds
      onAutoPlayCycle();
      autoPlayIntervalRef.current = setInterval(() => {
        onAutoPlayCycle();
      }, 8000);
    } else {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    }

    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, [isKioskActive]);

  return null;
}
