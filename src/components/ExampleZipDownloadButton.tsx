import './ExampleZipDownloadButton.css';
import JSZip from 'jszip';
import { Directory, Encoding } from '@capacitor/filesystem';
import { IonButton } from '@ionic/react';
import { usePerformance } from '../hooks/usePerformance';
import { useBackend } from '../hooks/useBackend';
import { useFilesystem } from '../hooks/useFilesystem';

interface ZipDownloadProps {
  downloadUrl: string;
  zipFileToExtract: string;
  savedFilename: string;
}

const ExampleZipDownloadButton: React.FC<ZipDownloadProps> = ({ downloadUrl, zipFileToExtract, savedFilename }) => {
  const { measurePerformance } = usePerformance();
  const { getSampleZipFile } = useBackend();
  const { read, write } = useFilesystem({ directory: Directory.Data, encoding: Encoding.UTF8 });
  
  const downloadAndExtractFile = async () => {
    // Download file
    const data = await measurePerformance({
      label: 'Axios get',
      action: () => getSampleZipFile(downloadUrl)
    });

    if (data) {
      try {
        // Unzip
        const zip = new JSZip();
        await measurePerformance({
          label: 'Unzip',
          action: () => zip.loadAsync(data)
        });

        // Log out result of unzipping
        console.debug('JSZip results:');
        zip.forEach((relativePath, zipEntry) => {
          console.debug('entry detected in zip: ', zipEntry.name);
        });

        // Access a specific item in unzipped contents
        const someZipContent = await measurePerformance({
          label: `Extract ${zipFileToExtract}`,
          action: async () => zip.file(zipFileToExtract)?.async('text')
        });
        
        if (someZipContent) {
          console.log('Unzip/Extracted Data: ', someZipContent);

          // Save extracted file to device
          await measurePerformance({
            label: 'Filesystem write',
            action: () => write(savedFilename, someZipContent)
          });

          // Read file to simulate loading it again at a later time
          const readResult = await measurePerformance({
            label: 'Filesystem read',
            action: () => read(savedFilename)
          });

          console.log('Saved Filesystem Data: ', readResult.data);
        }
      } catch (e) {
        console.error('Function downloadAndExtractFile failed', e);
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

export default ExampleZipDownloadButton;