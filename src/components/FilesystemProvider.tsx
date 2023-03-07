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
  const read = async (options: ReadFileOptions) => {
    const readResult = await Filesystem.readFile(options);
    return readResult;
  }
  const write = async (options: WriteFileOptions) => {
    const writeResult = await Filesystem.writeFile(options);
    return writeResult;
  };

  return (
    <FilesystemContext.Provider value={{ read, write }}>
      {children}
    </FilesystemContext.Provider>
  );
};