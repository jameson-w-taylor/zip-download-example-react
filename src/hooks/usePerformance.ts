import { useContext } from 'react';
import { PerformanceContext } from '../components/PerformanceProvider';

export const usePerformance = () => {
  const { measurePerformance } = useContext(PerformanceContext);

  if (measurePerformance === undefined) throw new Error('usePerformance must be used within a PerformanceProvider');

  return {
    measurePerformance
  };
};