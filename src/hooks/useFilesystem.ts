import { ReadFileOptions } from '@capacitor/filesystem';
import { useContext } from 'react';
import { FilesystemContext } from '../components/FilesystemProvider';

export const useFilesystem = (options: Omit<ReadFileOptions, 'path'>) => {
  const { read, write } = useContext(FilesystemContext);
  const { directory, encoding } = options;

  if (read === undefined || write === undefined) throw new Error('useFilesystem must be used within a FilesystemProvider');

  return {
    read: (path: string) => read({ path, directory, encoding }),
    write: (path: string, data: string) => write({ path, data, directory, encoding })
  };
};