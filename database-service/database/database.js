const mongoose = require('mongoose');
const fs = require('fs');

const mongoConnect = () => {
  fs.readFile('links.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      const configData = JSON.parse(data);
      const mongoUrl = configData.mongo_db_connection_link;
      mongoose
        .connect(mongoUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log('MONGO CONNECTION OPEN!!!');
        })
        .catch((err) => {
          console.log('OH NO MONGO CONNECTION ERROR!!!!');
          console.error(err);
        });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
};

exports.mongoConnect = mongoConnect;