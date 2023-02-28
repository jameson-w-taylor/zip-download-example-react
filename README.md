# Sample `.zip` download example
This application was written to demonstrate how to use [JSZip](https://stuk.github.io/jszip/) to process a `.zip` file downloaded with [Axios](https://axios-http.com/docs/intro) in a React application. It was created merely as a POC to show a working download, unzip, and saving to the filesystem. This was only tested on the web in a browser and may require additional changes to test on emulators or devices.

## Setup
There are 2 pieces required for this to work. There is a simple [Express](https://expressjs.com/en/starter/installing.html) server application located in `/zip-server` which serves an already included `.zip` file. There is also a `@ionic/react` application located in `/src` which downloads, unzips, and persists the file using the [Filesystem](https://capacitorjs.com/docs/apis/filesystem) plugin.

### Installation steps
1. Install server dependencies, and start server
```bash
cd zip-server
npm install
node index.js
```
2. Open another terminal, install app dependencies and start server
```bash
npm install
ionic serve
```
3. Open console, click "Download Zip File" button and observe output
