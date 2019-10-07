const path = require('path');

module.exports = {
  apps: [{
    name: 'invoice-server',
    script: './server/index.js',
    instances: 1,
    autorestart: true,
    watch_options: {
      usePolling: true
    },
    watch: process.env.NODE_ENV !== 'production' ? path.resolve(__dirname, './server') : false,
    max_memory_restart: '512M'
  }]
};
