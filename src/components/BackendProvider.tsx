import React, { createContext, PropsWithChildren } from 'react';
import axios from 'axios';

export const BackendContext = createContext<{
  getSampleZipFile?: (url: string) => Promise<ArrayBuffer>;
}>({
  getSampleZipFile: undefined
});

export const BackendProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const getSampleZipFile = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/zip'
      },
      responseType: 'arraybuffer'
    });
    return response.data as ArrayBuffer;
  }

  return (
    <BackendContext.Provider value={{ getSampleZipFile }}>
      {children}
    </BackendContext.Provider>
  );
};