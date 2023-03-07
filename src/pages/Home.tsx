import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExampleZipDownloadButton from '../components/ExampleZipDownloadButton';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExampleZipDownloadButton downloadUrl='/assets/Test.zip' zipFileToExtract='Test/MyFile.txt' savedFilename='doesThisWork.txt' />
      </IonContent>
    </IonPage>
  );
};

export default Home;