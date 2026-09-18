'use client';
import * as React from 'react';

const pad = (value: number) => value.toString().padStart(2, '0');

export const Clock = () => {
  // degrades to the placeholder if the script never runs, which is the intended fallback
  const [time, setTime] = React.useState('--:--:--');

  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <time className="tabular-nums">{time}</time>;
};
