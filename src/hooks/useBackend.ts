import { useContext } from 'react';
import { BackendContext } from '../components/BackendProvider';

export const useBackend = () => {
  const { getSampleZipFile } = useContext(BackendContext);

  if (getSampleZipFile === undefined) throw new Error('useBackend must be used within a BackendProvider');

  return {
    getSampleZipFile
  };
};