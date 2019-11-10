'use strict';
const mongoose = require('mongoose');

module.exports = {
    initMongoose: function (connectionString) {
        return new Promise((resolve, reject) => {
            // const { db: { host, port, name } } = config;
            // const connectionString = `mongodb://${host}:${port}/${name}`;
            mongoose.connect(connectionString);
            const db = mongoose.connection;
            db.on('error', (error) => {
                reject(error);
                console.error('mongod connection error:');
            });
            db.once('open', function callback() {
                console.info('mongo is connected');
                resolve();
            });
        });
    }
};