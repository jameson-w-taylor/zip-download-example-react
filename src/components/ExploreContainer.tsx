import './ExploreContainer.css';
import axios from 'axios';
import JSZip from 'jszip';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { IonButton } from '@ionic/react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const downloadAndExtractFile = async () => {
    let response: any = undefined;
    try {
      response = await axios.get('http://localhost:3000/downloadFile', {
        headers: {
          'Content-Type': 'application/zip'
        },
        responseType: 'arraybuffer'
      });
    } catch (e) {
      console.error('Axios failed', e);
    }

    if (response !== undefined) {
      // Does zip file download and unzip correctly?
      try {
        const zip = new JSZip();
        await zip.loadAsync(response.data);

        console.log('JSZip results:');
        zip.forEach((relativePath, zipEntry) => {
          console.log('entry detected in zip', zipEntry.name);
        });

        //Does zip file get saved to device correctly?
        try {
          const data = await zip.generateInternalStream({ type: 'base64' }).accumulate();
          const result = await Filesystem.writeFile({
            data,
            path: 'doesThisWork.zip',
            directory: Directory.Documents,
            recursive: true
          });
          console.log('Filesystem result', result);
        } catch (e) {
          console.error('Filesystem failed', e);
        }
      } catch (e) {
        console.error('JSZip failed', e);
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
