const fs = require('fs');

const jsonFilePath = './links.json';

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log('JSON data from the file:\n', jsonData.views_service_base_port);
    console.log('JSON data from the file:\n', jsonData.views_service_base_host);
  } catch (parseError) {
    
    console.error('Error parsing JSON:', parseError);
  }
});