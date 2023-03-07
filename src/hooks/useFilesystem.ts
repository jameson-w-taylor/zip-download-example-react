import { Filesystem, ReadFileOptions } from '@capacitor/filesystem';

export const useFilesystem = (options: ReadFileOptions) => {
  const { path, directory, encoding } = options;

  return {
    readFile: () => Filesystem.readFile({ path, directory, encoding }),
    writeFile: (data: string) => Filesystem.writeFile({ path, data, directory, encoding })
  };
};