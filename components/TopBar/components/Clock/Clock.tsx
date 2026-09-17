'use client';
import * as React from 'react';
import { tv } from 'tailwind-variants';

const clock = tv({ slots: { root: 'tabular-nums' } });

const { root } = clock();

export const Clock = () => {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const pad = (value: number) => value.toString().padStart(2, '0');

    const setNow = () => {
      const now = new Date();
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };

    setNow();
    const intervalId = setInterval(setNow, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // rendered empty on the server so the first paint cannot disagree with the client clock
  return <div className={root()}>{time}</div>;
};
