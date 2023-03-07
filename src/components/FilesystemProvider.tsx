import React, { createContext, PropsWithChildren } from 'react';
import { Filesystem, ReadFileResult, WriteFileResult, ReadFileOptions, WriteFileOptions } from '@capacitor/filesystem';

export const FilesystemContext = createContext<{
  read?: (options: ReadFileOptions) => Promise<ReadFileResult>;
  write?: (options: WriteFileOptions) => Promise<WriteFileResult>;
}>({
  read: undefined,
  write: undefined
});

export const FilesystemProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const read = async (options: ReadFileOptions) => Filesystem.readFile(options);
  const write = async (options: WriteFileOptions) => Filesystem.writeFile(options);

  return (
    <FilesystemContext.Provider value={{ read, write }}>
      {children}
    </FilesystemContext.Provider>
  );
};