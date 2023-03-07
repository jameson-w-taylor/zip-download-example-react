# Sample `.zip` download example
This application was written to demonstrate how to use [JSZip](https://stuk.github.io/jszip/) to process a `.zip` file downloaded with [Axios](https://axios-http.com/docs/intro) in a React application. It was created merely as a POC to show a working download, unzip, and saving to the filesystem.

## Installation steps
1. Install app dependencies
```bash
npm install
```
2. Serve to view on the web
```bash
ionic serve
```
3. Open the browser console to view logs (enable `verbose` to see performance logs)
4. click "Download Zip File" button and observe output
5. Add your platform of choice and run in simulator/emulator (optional)
```bash
# Choose a platform
ionic capacitor add ios
ionic capacitor add android

# Build and sync
ionic build
ionic capacitor sync

# Open Native Editor
ionic capacitor open ios
ionic capacitor open android
```

### Notes
Typically there would be a web server involved for downloading the file, but to make this example simpler it is bundled with the application code (`public/assets/Test.zip`). This is not suitable for production, but enables the ability to "download" the `.zip` file when running on devices through the local Capacitor web server.

The `Home` page passes some configuration values to the `ExampleZipDownloadButton` which controls where the `.zip` file is located, what item _within_ the file to extract and the name of the file that's saved to the device.