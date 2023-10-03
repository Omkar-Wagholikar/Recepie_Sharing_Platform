import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

const jsonFilePath = '../links.json';
var hostVal = 'localhost';
var portVal = 3000
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log('front-end port:\n', jsonData.views_service_base_port);
    console.log('front-end host:\n', jsonData.views_service_base_host);
    hostVal = jsonData.views_service_base_host;
    portVal = jsonData.views_service_base_port;
  } catch (parseError) {
    
    console.error('Error parsing JSON:', parseError);
  }
});

export default defineConfig({
  server: {
    host: hostVal,
    port: portVal,
  },
  plugins: [react({
    include: "**/*.jsx",
  })]
})


// https://vitejs.dev/config/
// export default defineConfig({
  // plugins: [react({
  //   // Add this line
  //   include: "**/*.jsx",
  // })]
// })