import axios from 'axios';

export const useBackend = () => {
  const getSampleZipFile = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/zip'
      },
      responseType: 'arraybuffer'
    });
    return response.data as ArrayBuffer;
  }
  
  return {
    getSampleZipFile
  };
};