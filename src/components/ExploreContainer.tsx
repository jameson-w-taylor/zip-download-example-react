import './ExploreContainer.css';
import axios from 'axios';
import JSZip from 'jszip';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { IonButton } from '@ionic/react';

const zipFilename = 'doesThisWork.zip';
const fileWithinZip = 'Test/MyFile.txt';

interface ContainerProps { }

const downloadZipFile = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/zip'
      },
      responseType: 'blob'
    });
    return response.data as Blob;
  } catch (e) {
    console.error('Axios failed', e);
  }
}
// Convert a Blob into base64 so we can persist to device with Filesystem plugin
const base64Encode = async (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (reader.result && !(reader.result instanceof ArrayBuffer)) {
        // eslint-disable-next-line
        const [_, base64] = reader.result.split(',');
        resolve(base64);
      }
      reject('Failed to encode');
    };

    reader.onerror = (event) => {
      reject(event);
    };
    
    reader.readAsDataURL(blob);
  });
}
const saveFile = async (filename: string, fileData: Blob) => {
  try {
    const data = await base64Encode(fileData) as string;
    const writeResult = await Filesystem.writeFile({
      data,
      path: filename,
      directory: Directory.Data,
      recursive: true
    });
    console.log('Filesystem write result', writeResult);
    return writeResult;
  } catch (e) {
    console.error('Filesystem write failed', e);
  }
}
const readFile = async (filename: string) => {
  try {
    const readResult = await Filesystem.readFile({
      path: filename,
      directory: Directory.Data
    });
    console.log('Filesystem read result', readResult);
    return readResult.data;
  } catch (e) {
    console.error('Filesystem read failed', e);
  }
}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const downloadAndExtractFile = async () => {
    const data = await downloadZipFile('http://localhost:3000/downloadFile');

    if (data) {
      // Persist zip file to device first
      await saveFile(zipFilename, data);
      // Read zip file from device (to ensure unzipping in future will also work from this source)
      const zipFile = await readFile(zipFilename);

      try {
        if (zipFile) {
          // Unzip
          const zip = new JSZip();
          await zip.loadAsync(zipFile, { base64: true });
  
          // Log out result of unzipping
          console.log('JSZip results:');
          zip.forEach((relativePath, zipEntry) => {
            console.log('entry detected in zip', zipEntry.name);
          });
  
          // Access a specific item in unzipped contents
          const someZipContent = await zip.file(fileWithinZip)?.async('text');
          console.log(`Contents of ${fileWithinZip}: ${someZipContent}`);
        }
      } catch (e) {
        console.error('Unzipping file failed', e);
      }
    }
  };

  return (
    <div className="container">
      <IonButton onClick={downloadAndExtractFile}>
        Download Zip File
      </IonButton>
    </div>
  );
};

export default ExploreContainer;
