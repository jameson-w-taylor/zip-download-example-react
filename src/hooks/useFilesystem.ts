import { Filesystem, ReadFileOptions } from '@capacitor/filesystem';

export const useFilesystem = (options: Pick<ReadFileOptions, 'directory'|'encoding'>) => {
  const { directory, encoding } = options;

  return {
    read: (path: string) => Filesystem.readFile({ path, directory, encoding }),
    write: (path: string, data: string) => Filesystem.writeFile({ path, data, directory, encoding })
  };
};