import React, { createContext, PropsWithChildren } from 'react';

interface PerformanceOptions<T> {
  label: string;
  action: () => Promise<T>;
}

const formatTime = (duration: number) => {
  let remain = duration
  const minutes = Math.floor(remain / (1000 * 60))
  remain = remain % (1000 * 60)
  const seconds = Math.floor(remain / (1000))
  remain = Math.round(remain % (1000));

  const minuteDisplay = minutes.toString().padStart(2, '0');
  const secondDisplay = seconds.toString().padStart(2, '0');

  return `${minuteDisplay}:${secondDisplay}.${remain}`;
}

export const PerformanceContext = createContext<{
  measurePerformance?: <T>(options: PerformanceOptions<T>) => Promise<T>;
}>({
  measurePerformance: undefined
});

export const PerformanceProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const measurePerformance = async function <T>(options: PerformanceOptions<T>) {
    const { label, action } = options;
    let start = 0;
    let end = 0;
  
    try {
      console.debug(`${label} begin`);
      start = performance.now();
      const result = await action();
      end = performance.now();
      console.debug(`${label} success`);
      return result;
    } catch (e) {
      end = performance.now();
      console.error(`${label} failed`, e);
      throw e;
    } finally {
      console.debug(`[Performance] ${label} duration -> ${formatTime(end - start)}`);
    }
  }

  return (
    <PerformanceContext.Provider value={{ measurePerformance }}>
      {children}
    </PerformanceContext.Provider>
  );
};