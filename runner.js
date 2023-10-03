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
        if(folder == "client-service"){
          const npmProcess = spawn('npm', ['run', 'dev'], {
            cwd: path.join(this.rootFolderPath, folder),
            shell: true, // Use a shell to execute npm command
          });

          npmProcess.stdout.on('data', async (data) => {
            console.log(`\n${folder} Output: \n${data}`);
          });

          npmProcess.stderr.on('data', async (data) => {
            console.error(`${folder} Error: ${data}`);
          });

          npmProcess.on('close',async (code) => {
            console.log(`${folder} exited with code ${code}`);
          });
        }
        else if(folder != ".git"){
            const indexPath = path.join(this.rootFolderPath, folder, 'index.js');
            const childProcess = spawn('node', [indexPath]);

            childProcess.stdout.on('data', async (data) => {
            console.log(`\n${folder} Output: \n${data}`);
            });

            childProcess.stderr.on('data', async (data) => {
            console.error(`${folder} Error: ${data}`);
            });

            childProcess.on('close', async (code) => {
            console.log(`${folder} exited with code ${code}`);
            });
        }
      });
      console.log("All services have been booted");
    });
  }
}

const rootFolderPath = './';
const folderRunner = new FolderRunner(rootFolderPath);
folderRunner.runIndexInAllFolders();
