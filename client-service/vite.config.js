import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises'; // Use promises version of fs

const jsonFilePath = '../links.json';

async function getConfig() {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const hostVal = jsonData.views_service_base_host;
    const portVal = jsonData.views_service_base_port;
    console.log('front-end port:\n', portVal);
    console.log('front-end host:\n', hostVal);
    return { host: hostVal, port: portVal };
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    return { host: 'localhost', port: 3000 }; // Default values if there's an error
  }
}

export default async () => {
  const config = await getConfig();

  return defineConfig({
    server: config,
    plugins: [
      react({
        include: '**/*.jsx',
      }),
    ],
  });
};
