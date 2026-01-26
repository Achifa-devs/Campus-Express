import { useEffect, useState } from 'react';
import Tools from '../utils/generalHandler';

export default function useCyclicTimeWatch(pastDate, durationHours = 6) {
  const [timeData, setTimeData] = useState(() =>
    Tools.cyclicTimeWatch(pastDate, durationHours)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeData(Tools.cyclicTimeWatch(pastDate, durationHours));
    }, 1000);

    return () => clearInterval(interval);
  }, [pastDate, durationHours]);

  return timeData;
}
