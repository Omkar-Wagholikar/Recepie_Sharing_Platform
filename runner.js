const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class FolderRunner {
  constructor(rootFolderPath) {
    this.rootFolderPath = rootFolderPath;
  }

  runIndexInAllFolders() {
    fs.readdir(this.rootFolderPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      const folders = files.filter((file) => {
        const filePath = path.join(this.rootFolderPath, file);
        return fs.statSync(filePath).isDirectory();
      });

      console.log('Folders in the root directory:');
      folders.forEach((folder) => {
        console.log(folder);

        // Start 'index.js' in each folder as a child process
        const indexPath = path.join(this.rootFolderPath, folder, 'index.js');
        const childProcess = spawn('node', [indexPath]);
        
        childProcess.stdout.on('data', (data) => {
          console.log(`\n${folder} Output: \n${data}`);
        });

        childProcess.stderr.on('data', (data) => {
          console.error(`${folder} Error: ${data}`);
        });

        childProcess.on('close', (code) => {
          console.log(`${folder} exited with code ${code}`);
        });
      });
    });
  }
}

const rootFolderPath = './';
const folderRunner = new FolderRunner(rootFolderPath);
folderRunner.runIndexInAllFolders();
