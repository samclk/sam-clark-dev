'use client';
import * as React from 'react';

export const Clock = () => {
  const [seconds, setSeconds] = React.useState<number | null>(null);
  const [minutes, setMinutes] = React.useState<number | null>(null);
  const [hours, setHours] = React.useState<number | null>(null);

  const timeIsReady = hours !== null && minutes !== null && seconds !== null;

  React.useEffect(() => {
    function setTime() {
      const now = new Date();

      setSeconds(now.getSeconds());
      setMinutes(now.getMinutes());
      setHours(now.getHours());
    }

    const intervalId = setInterval(setTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section>
      {timeIsReady && (
        <div>
          {hours?.toString().padStart(2, '0')}:{minutes?.toString().padStart(2, '0')}:
          {seconds?.toString().padStart(2, '0')}
        </div>
      )}
    </section>
  );
};
